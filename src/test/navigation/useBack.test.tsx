import { renderHook } from "@testing-library/react";
import { useRemoteBack } from "@/navigation/hooks/useBack";

describe("useRemoteBack", () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
  });

  it("should call onBack when delete key (46) is pressed", () => {
    renderHook(() => useRemoteBack(mockOnBack));

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when Samsung TV back key (10009) is pressed", () => {
    renderHook(() => useRemoteBack(mockOnBack));

    const event = new KeyboardEvent("keydown", { keyCode: 10009 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when webOS TV back key (461) is pressed", () => {
    renderHook(() => useRemoteBack(mockOnBack));

    const event = new KeyboardEvent("keydown", { keyCode: 461 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should preventDefault and stopPropagation by default", () => {
    renderHook(() => useRemoteBack(mockOnBack));

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    const stopPropagationSpy = vi.spyOn(event, "stopPropagation");

    window.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it("should not preventDefault when preventDefault option is false", () => {
    renderHook(() => useRemoteBack(mockOnBack, { preventDefault: false }));

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    const stopPropagationSpy = vi.spyOn(event, "stopPropagation");

    window.dispatchEvent(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(stopPropagationSpy).not.toHaveBeenCalled();
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("should not call onBack when enabled is false", () => {
    renderHook(() => useRemoteBack(mockOnBack, { enabled: false }));

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).not.toHaveBeenCalled();
  });

  it("should not call onBack for non-back keycodes", () => {
    renderHook(() => useRemoteBack(mockOnBack));

    const event = new KeyboardEvent("keydown", { keyCode: 13 } as any); // Enter key
    window.dispatchEvent(event);

    expect(mockOnBack).not.toHaveBeenCalled();
  });

  it("should remove event listener on unmount", () => {
    const { unmount } = renderHook(() => useRemoteBack(mockOnBack));

    unmount();

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).not.toHaveBeenCalled();
  });

  it("should update listener when onBack callback changes", () => {
    const mockOnBack2 = vi.fn();
    const { rerender } = renderHook(
      ({ callback }) => useRemoteBack(callback),
      { initialProps: { callback: mockOnBack } }
    );

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
    expect(mockOnBack2).not.toHaveBeenCalled();

    // Update callback
    rerender({ callback: mockOnBack2 });

    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1); // Still 1
    expect(mockOnBack2).toHaveBeenCalledTimes(1); // New callback called
  });

  it("should handle enabled option changing dynamically", () => {
    const { rerender } = renderHook(
      ({ enabled }) => useRemoteBack(mockOnBack, { enabled }),
      { initialProps: { enabled: true } }
    );

    const event = new KeyboardEvent("keydown", { keyCode: 46 } as any);
    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1);

    // Disable
    rerender({ enabled: false });

    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(1); // Still 1, not called again

    // Re-enable
    rerender({ enabled: true });

    window.dispatchEvent(event);

    expect(mockOnBack).toHaveBeenCalledTimes(2); // Called again
  });
});
