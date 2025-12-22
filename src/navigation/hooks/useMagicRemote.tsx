import { useEffect, type RefObject } from "react";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";

interface UseMagicRemoteOptions {
  focusKey?: string;
  preventDefaultClick?: boolean;
  onEnter?: () => void;
}

/**
 * Hook to support Magic Remote / Mouse interactions for Smart TV
 * - onPointerMove/onMouseMove: move focus using setFocus()
 * - onPointerDown/onClick: act as "Enter"
 */
export function useMagicRemote<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseMagicRemoteOptions = {}
) {
  const { focusKey, preventDefaultClick = true, onEnter } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    /**
     * Set focus when pointer/mouse moves over the element
     */
    const handlePointerMove = () => {
      if (focusKey) {
        setFocus(focusKey);
      }
    };

    /**
     * Call onEnter when pointer/mouse is pressed down
     * Don't preventDefault to allow native navigation (Links, etc.)
     */
    const handlePointerDown = (event: PointerEvent) => {
        if (preventDefaultClick) {
        event.preventDefault();
        }
      if (onEnter) {
        onEnter();
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
        if (preventDefaultClick) {
        event.preventDefault();
        }
      if (onEnter) {
        onEnter();
      }
    };

    // Add event listeners for both pointer and mouse events for compatibility
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("mousemove", handlePointerMove);
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("mousedown", handleMouseDown);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("mousemove", handlePointerMove);
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("mousedown", handleMouseDown);
    };
  }, [focusKey, onEnter, ref, preventDefaultClick]);
}
