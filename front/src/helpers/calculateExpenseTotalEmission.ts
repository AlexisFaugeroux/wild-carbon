export function formatNumberTwoDigits(number: number) {
  return Math.round(number * 100) / 100;
}

export function calculateExpenseTotalEmission(
  emissionFactor: number,
  quantity: number,
): number {
  if (emissionFactor < 0 || quantity < 0) return 0;

  const emissionTotal = emissionFactor * quantity;
  return formatNumberTwoDigits(emissionTotal);
}
