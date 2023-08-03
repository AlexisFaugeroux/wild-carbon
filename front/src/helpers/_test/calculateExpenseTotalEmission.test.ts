import { calculateExpenseTotalEmission } from '../calculateExpenseTotalEmission';

describe('expense emission', () => {
  it('should be equal to', () => {
    const emissionFactor = 5;
    const quantity = 6;
    expect(calculateExpenseTotalEmission(emissionFactor, quantity)).toBe(30);
  });

  it('should return 0 if at least one of the arguments is negative', () => {
    const emissionFactor = -56;
    const quantity = -66;
    expect(calculateExpenseTotalEmission(emissionFactor, quantity)).toBe(0);
  });
});
