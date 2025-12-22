import { Link } from "react-router";
import styles from "./Header.module.scss";
import logo from "@assets/my-tv-logo.svg";
import { useContent } from "@/contexts";
import type { IContentTab } from "@/models/content";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { MENU_FOCUS_KEY } from "@/navigation/keys";

const navItems: IContentTab[] = [
  { to: "/home", name: "Home", id: "home" },
  { to: "/movies", name: "Movies", id: "movies" },
  { to: "/series", name: "Series", id: "series" },
  { to: "/kids", name: "Kids", id: "kids" },
];

const HeaderLink = ({
  item,
  selectedTab,
  setSelectedTab,
}: {
  item: IContentTab;
  selectedTab?: string;
  setSelectedTab: (item: IContentTab) => void;
}) => {
  const { ref, focused } = useFocusable({
    onEnterRelease: () => {
      ref.current?.click();
    },
  });
  return (
    <li
      key={item.id}
      className={`${
        selectedTab?.toLowerCase() === item.id.toLowerCase()
          ? styles.active
          : ""
      } ${focused ? styles.focused : ""}`}
    >
      <Link to={item.to} onClick={() => setSelectedTab(item)} ref={ref}>
        {item.name}
      </Link>
    </li>
  );
};

const Logo = () => {
  const { ref, focused } = useFocusable({
    onEnterRelease: () => {
      ref.current?.click();
    },
  });
  return (
    <Link to="/user" ref={ref} className={focused ? styles.logoFocused : ""}>
      <img src={logo} alt="App Logo" className={styles.logo} />
    </Link>
  );
};

export const Header = () => {
  const { setSelectedTab, selectedTab } = useContent();
  const { ref, focusKey } = useFocusable({ focusKey: MENU_FOCUS_KEY });

  return (
    <FocusContext.Provider value={focusKey}>
      <nav ref={ref} className={styles.header}>
        <Logo />
        <ul className={styles.itemsList}>
          {navItems.map((item) => (
            <HeaderLink
              key={item.id}
              item={item}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </ul>
      </nav>
    </FocusContext.Provider>
  );
};
