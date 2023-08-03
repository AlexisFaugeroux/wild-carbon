export function formatNumberTwoDigits(number: number) {
  return Math.round(number * 100) / 100;
}

export function calculateExpenseTotalEmission(
  emissionFactor: number,
  quantity: number,
): number {
  const emissionTotal = emissionFactor * quantity;
  return formatNumberTwoDigits(emissionTotal);
}
