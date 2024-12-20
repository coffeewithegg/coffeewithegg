import { describe, it, expect } from "vitest";

import { nearEquals } from ".";

describe("nearEquals", () => {
  it("returns true when numbers are equal", () => {
    expect(nearEquals(1, 1)).toBe(true);
  });

  it("returns true when numbers are within default epsilon", () => {
    expect(nearEquals(1, 1.00005)).toBe(true);
    expect(nearEquals(1, 0.99995)).toBe(true);
  });

  it("returns false when numbers are outside default epsilon", () => {
    expect(nearEquals(1, 1.001)).toBe(false);
    expect(nearEquals(1, 0.998)).toBe(false);
  });

  it("uses a custom epsilon correctly", () => {
    expect(nearEquals(1, 1.1, 0.2)).toBe(true);
    expect(nearEquals(1, 1.3, 0.2)).toBe(false);
  });

  it("returns false when numbers are significantly different", () => {
    expect(nearEquals(100, 1)).toBe(false);
  });

  it("works with negative numbers", () => {
    expect(nearEquals(-1, -1)).toBe(true);
    expect(nearEquals(-1, -1.00005)).toBe(true);
    expect(nearEquals(-1, -1.1, 0.2)).toBe(true);
    expect(nearEquals(-1, -1.3, 0.2)).toBe(false);
  });

  it("works with mixed positive and negative numbers", () => {
    expect(nearEquals(1, -1, 2)).toBe(true);
    expect(nearEquals(1, -1, 1)).toBe(false);
  });

  it("works with zero", () => {
    expect(nearEquals(0, 0)).toBe(true);
    expect(nearEquals(0, 0.00005)).toBe(true);
    expect(nearEquals(0, 0.001)).toBe(false);
  });
});
