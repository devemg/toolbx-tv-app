import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import { Outlet } from "react-router";

interface AppProps {
}

export const App: React.FC<AppProps> = ({ }) => {
  const { ref, focusSelf, focusKey } = useFocusable({
    preferredChildFocusKey: "MENU_FOCUS_KEY",
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <Outlet />
      </div>
    </FocusContext.Provider>
  );
};
