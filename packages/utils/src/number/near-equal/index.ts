/**
 * Returns true if the two numbers are within epsilon of each other.
 * @param a The first number
 * @param b The second number
 * @param epsilon The maximum difference between the two numbers
 * @returns true if the two numbers are within epsilon of each other
 * @example
 * ```ts
 * nearEquals(1, 1.0001); // true
 * nearEquals(1, 1.1); // false
 * nearEquals(1, 1.1, 0.2); // true
 * ```
 */
export const nearEquals = (a: number, b: number, epsilon = 0.0001): boolean =>
  Math.abs(a - b) <= epsilon;
