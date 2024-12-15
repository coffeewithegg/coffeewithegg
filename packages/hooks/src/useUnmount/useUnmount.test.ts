import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, vitest } from "vitest";

import { useUnmount } from ".";

describe("useUnmount()", () => {
  it("should call the cleanup function on unmount", () => {
    const cleanupMock = vitest.fn();

    const { unmount } = renderHook(() => {
      useUnmount(cleanupMock);
    });

    expect(cleanupMock).not.toHaveBeenCalled();

    act(() => {
      unmount();
    });

    expect(cleanupMock).toHaveBeenCalled();
  });
});
