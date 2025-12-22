import { renderHook } from "@testing-library/react";
import { useMagicRemote } from "@/navigation/hooks/useMagicRemote";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";

vi.mock("@noriginmedia/norigin-spatial-navigation", () => ({
  setFocus: vi.fn(),
}));

describe("useMagicRemote", () => {
  let element: HTMLDivElement;
  let ref: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
    ref = { current: element };
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe("Pointer/Mouse Move Events", () => {
    it("should call setFocus when pointermove event is triggered", () => {
      renderHook(() => useMagicRemote(ref, { focusKey: "test-key" }));

      element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));

      expect(setFocus).toHaveBeenCalledWith("test-key");
    });

    it("should call setFocus when mousemove event is triggered", () => {
      renderHook(() => useMagicRemote(ref, { focusKey: "test-key" }));

      element.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));

      expect(setFocus).toHaveBeenCalledWith("test-key");
    });

    it("should not call setFocus when focusKey is not provided", () => {
      renderHook(() => useMagicRemote(ref));

      element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));
      element.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));

      expect(setFocus).not.toHaveBeenCalled();
    });
  });

  describe("Pointer/Mouse Down Events", () => {
    it("should call onEnter when pointerdown event is triggered", () => {
      const mockOnEnter = vi.fn();
      renderHook(() => useMagicRemote(ref, { onEnter: mockOnEnter }));

      element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));

      expect(mockOnEnter).toHaveBeenCalledTimes(1);
    });

    it("should call onEnter when mousedown event is triggered", () => {
      const mockOnEnter = vi.fn();
      renderHook(() => useMagicRemote(ref, { onEnter: mockOnEnter }));

      element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      expect(mockOnEnter).toHaveBeenCalledTimes(1);
    });

    it("should not call onEnter when it is not provided", () => {
      renderHook(() => useMagicRemote(ref));

      // Should not throw
      expect(() => {
        element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      }).not.toThrow();
    });
  });

  describe("preventDefault behavior", () => {
    it("should preventDefault on pointerdown by default", () => {
      renderHook(() => useMagicRemote(ref));

      const event = new PointerEvent("pointerdown", { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should preventDefault on mousedown by default", () => {
      renderHook(() => useMagicRemote(ref));

      const event = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should not preventDefault when preventDefaultClick is false", () => {
      renderHook(() => useMagicRemote(ref, { preventDefaultClick: false }));

      const pointerEvent = new PointerEvent("pointerdown", { bubbles: true, cancelable: true });
      const mouseEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
      const pointerPreventDefaultSpy = vi.spyOn(pointerEvent, "preventDefault");
      const mousePreventDefaultSpy = vi.spyOn(mouseEvent, "preventDefault");

      element.dispatchEvent(pointerEvent);
      element.dispatchEvent(mouseEvent);

      expect(pointerPreventDefaultSpy).not.toHaveBeenCalled();
      expect(mousePreventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe("Event listener cleanup", () => {
    it("should remove event listeners on unmount", () => {
      const mockOnEnter = vi.fn();
      const { unmount } = renderHook(() =>
        useMagicRemote(ref, { focusKey: "test-key", onEnter: mockOnEnter })
      );

      unmount();

      element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));
      element.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
      element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      expect(setFocus).not.toHaveBeenCalled();
      expect(mockOnEnter).not.toHaveBeenCalled();
    });
  });

  describe("Options updates", () => {
    it("should update focusKey when it changes", () => {
      const { rerender } = renderHook(
        ({ focusKey }) => useMagicRemote(ref, { focusKey }),
        { initialProps: { focusKey: "key-1" } }
      );

      element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));
      expect(setFocus).toHaveBeenCalledWith("key-1");

      vi.clearAllMocks();

      rerender({ focusKey: "key-2" });

      element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));
      expect(setFocus).toHaveBeenCalledWith("key-2");
    });

    it("should update onEnter callback when it changes", () => {
      const mockOnEnter1 = vi.fn();
      const mockOnEnter2 = vi.fn();

      const { rerender } = renderHook(
        ({ onEnter }) => useMagicRemote(ref, { onEnter }),
        { initialProps: { onEnter: mockOnEnter1 } }
      );

      element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      expect(mockOnEnter1).toHaveBeenCalledTimes(1);
      expect(mockOnEnter2).not.toHaveBeenCalled();

      rerender({ onEnter: mockOnEnter2 });

      element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      expect(mockOnEnter1).toHaveBeenCalledTimes(1); // Still 1
      expect(mockOnEnter2).toHaveBeenCalledTimes(1); // New callback called
    });
  });

  describe("Integration", () => {
    it("should work with all options enabled", () => {
      const mockOnEnter = vi.fn();
      renderHook(() =>
        useMagicRemote(ref, {
          focusKey: "integration-key",
          onEnter: mockOnEnter,
          preventDefaultClick: true,
        })
      );

      // Test move
      element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));
      expect(setFocus).toHaveBeenCalledWith("integration-key");

      // Test click
      const event = new PointerEvent("pointerdown", { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");
      element.dispatchEvent(event);

      expect(mockOnEnter).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should handle rapid pointer movements", () => {
      renderHook(() => useMagicRemote(ref, { focusKey: "test-key" }));

      for (let i = 0; i < 10; i++) {
        element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true }));
      }

      expect(setFocus).toHaveBeenCalledTimes(10);
    });
  });
});
