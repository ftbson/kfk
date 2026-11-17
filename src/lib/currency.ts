export const USD_TO_XOF_RATE = 610;

export function convertUsdToXof(amount: number): number {
  return Math.round(amount * USD_TO_XOF_RATE);
}

export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount)} FCFA`;
}
