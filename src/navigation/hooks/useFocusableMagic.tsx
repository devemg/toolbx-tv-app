import {
  useFocusable,
  type UseFocusableConfig,
} from "@noriginmedia/norigin-spatial-navigation";
import { useMagicRemote } from "./useMagicRemote";

/**
 * Wrapper hook that combines useFocusable with useMagicRemote for leaf components
 * Provides both keyboard navigation and Magic Remote/Mouse support
 */
export function useFocusableMagic<
  T extends HTMLElement = HTMLElement
>(config?: UseFocusableConfig<T>) {
  const focusable = useFocusable<T>(config);

  // Add Magic Remote support
  useMagicRemote(focusable.ref, {
    focusKey: focusable.focusKey,
    onEnter: () => config?.onEnterRelease?.({} as any),
  });

  return focusable;
}
