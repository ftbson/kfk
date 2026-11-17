import { randomUUID } from "node:crypto";
import { desc, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  isAdminAuthenticated,
  isRateLimited,
  isSameOriginRequest,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { orderItems, orders } from "@/lib/schema";
import { sendMail } from "@/lib/mail";
import { productsData } from "@/data/products";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/currency";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Create an order from catalog prices, never from client-provided totals.
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    if (
      !isRecord(body) ||
      !isRecord(body.customer) ||
      !Array.isArray(body.items)
    ) {
      return NextResponse.json(
        { error: "Invalid order data." },
        { status: 400 },
      );
    }

    const customer = body.customer;
    const firstName =
      typeof customer.firstName === "string" ? customer.firstName.trim() : "";
    const lastName =
      typeof customer.lastName === "string" ? customer.lastName.trim() : "";
    const country =
      typeof customer.country === "string" ? customer.country.trim() : "";
    const street =
      typeof customer.streetAddress === "string"
        ? customer.streetAddress.trim()
        : "";
    const postalCode =
      typeof customer.postalCode === "string" ? customer.postalCode.trim() : "";
    const city = typeof customer.city === "string" ? customer.city.trim() : "";
    const streetAddress = `${street}, ${postalCode} ${city}`;
    const whatsapp =
      typeof customer.whatsapp === "string" ? customer.whatsapp.trim() : "";
    const email =
      typeof customer.email === "string"
        ? customer.email.trim().toLowerCase()
        : "";

    if (
      !firstName ||
      firstName.length > 100 ||
      !lastName ||
      lastName.length > 100 ||
      !country ||
      country.length > 100 ||
      !street ||
      street.length > 200 ||
      !postalCode ||
      postalCode.length > 20 ||
      !city ||
      city.length > 100 ||
      !whatsapp ||
      whatsapp.length > 40 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254
    ) {
      return NextResponse.json(
        { error: "Please check your contact and shipping details." },
        { status: 400 },
      );
    }
    if (body.items.length === 0 || body.items.length > 40) {
      return NextResponse.json(
        { error: "Cart is empty or invalid." },
        { status: 400 },
      );
    }

    const quantities = new Map<string, number>();
    for (const rawItem of body.items) {
      if (
        !isRecord(rawItem) ||
        typeof rawItem.id !== "string" ||
        typeof rawItem.quantity !== "number" ||
        !Number.isInteger(rawItem.quantity)
      ) {
        return NextResponse.json(
          { error: "Invalid product data." },
          { status: 400 },
        );
      }

      const quantity = (quantities.get(rawItem.id) ?? 0) + rawItem.quantity;
      if (
        !productsData.some((product) => product.id === rawItem.id) ||
        quantity > 99 ||
        quantity < 1
      ) {
        return NextResponse.json(
          { error: "Invalid product or quantity." },
          { status: 400 },
        );
      }
      quantities.set(rawItem.id, quantity);
    }

    const items = [...quantities.entries()].map(([id, quantity]) => {
      const product = productsData.find((candidate) => candidate.id === id);
      if (!product)
        throw new Error("Validated catalog product could not be found.");
      return {
        productId: product.id,
        title: product.title,
        category: product.category,
        quantity,
        unitPrice: product.price,
      };
    });

    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const shippingCost =
      subtotal > siteConfig.legal.shippingCostThreshold ||
      items.length === 0
        ? 0
        : siteConfig.legal.shippingCostBase;
    const grandTotal = subtotal + shippingCost;
    const customerSession = await getAuthenticatedUser();
    const orderEmail = customerSession?.email ?? email;
    if (await isRateLimited("order", orderEmail, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        {
          error: "Too many orders in a short time. Please contact us.",
        },
        { status: 429 },
      );
    }

    const orderId = `ORD-${randomUUID()}`;
    const createdAt = new Date().toISOString();

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        firstName,
        lastName,
        country,
        streetAddress,
        whatsapp,
        email: orderEmail,
        userId: customerSession?.id ?? null,
        subtotal,
        shippingCost,
        grandTotal,
        status: "pending",
        createdAt,
      });

      await tx.insert(orderItems).values(
        items.map((item) => ({
          id: randomUUID(),
          orderId,
          ...item,
        })),
      );
    });

    let emailNotificationSent = true;
    try {
      await sendMail({
        subject: `[KFK Order] ${orderId} - ${firstName} ${lastName}`,
        replyTo: orderEmail,
        text: [
          "New KFK Order",
          "",
          `Order Number: ${orderId}`,
          `Customer: ${firstName} ${lastName}`,
          `Country: ${country}`,
          `Shipping Address: ${streetAddress}`,
          `Phone: ${whatsapp}`,
          `Email: ${orderEmail}`,
          "",
          "Products:",
          ...items.map(
            (item) =>
              `- ${item.quantity} x ${item.title} (${item.category}) - ${formatPrice(item.unitPrice * item.quantity)}`,
          ),
          "",
          `Subtotal: ${formatPrice(subtotal)}`,
          `Shipping: ${formatPrice(shippingCost)}`,
          `Total: ${formatPrice(grandTotal)}`,
          "Status: pending",
          `Date: ${createdAt}`,
        ].join("\n"),
      });
    } catch (error) {
      emailNotificationSent = false;
      console.error(
        `Order ${orderId} saved, but admin email failed:`,
        error,
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        subtotal,
        shippingCost,
        grandTotal,
        emailNotificationSent,
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 },
      );
    }

    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
    if (allOrders.length === 0) {
      return NextResponse.json([], {
        headers: { "Cache-Control": "no-store" },
      });
    }

    const items = await db
      .select()
      .from(orderItems)
      .where(
        inArray(
          orderItems.orderId,
          allOrders.map((order) => order.id),
        ),
      );
    const itemsByOrder = new Map<string, typeof items>();
    for (const item of items) {
      const currentItems = itemsByOrder.get(item.orderId) ?? [];
      currentItems.push(item);
      itemsByOrder.set(item.orderId, currentItems);
    }

    return NextResponse.json(
      allOrders.map((order) => ({
        ...order,
        items: itemsByOrder.get(order.id) ?? [],
      })),
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Error loading orders:", error);
    return NextResponse.json(
      { error: "Error loading orders" },
      { status: 500 },
    );
  }
}