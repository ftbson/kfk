import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Livraison & Retours",
  description: "Frais de livraison, délais, paiement et politique de retour pour KFK (KUN FAYA KUN).",
};

export default function ShippingReturnsRedirect() {
  redirect("/shipping");
}