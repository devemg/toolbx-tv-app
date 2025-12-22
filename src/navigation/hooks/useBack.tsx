import { useEffect } from 'react';

const BACK_KEYCODES = [46, 461, 10009];
// 46 - Develop web back with delete
// 10009 - samsung TV remote back keycode
// 461 - webOS TV remote back keycode

type UseRemoteBackOptions = {
  enabled?: boolean;
  preventDefault?: boolean;
};

export function useRemoteBack(
  onBack: () => void,
  options: UseRemoteBackOptions = {}
) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isBack = BACK_KEYCODES.includes(event.keyCode);

      if (!isBack) return;

      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      onBack();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, preventDefault, onBack]);
}
