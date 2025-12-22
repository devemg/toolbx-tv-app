import { Link } from "react-router";
import styles from "./Header.module.scss";
import logo from "@assets/my-tv-logo.svg";
import { useContent } from "@/contexts";
import type { IContentTab } from "@/models/content";

const navItems: IContentTab[] = [
  { to: "/home", name: "Home", id: "home" },
  { to: "/movies", name: "Movies", id: "movies" },
  { to: "/series", name: "Series", id: "series" },
  { to: "/kids", name: "Kids", id: "kids" },
];

export const Header = () => {
  const { setSelectedTab, selectedTab } = useContent();
  return (
    <nav className={styles.header}>
      <Link to="/">
        <img src={logo} alt="App Logo" className={styles.logo} />
      </Link>

      <ul className={styles.itemsList}>
        {navItems.map((item) => (
          <li
            key={item.id}
            className={
              selectedTab?.toLowerCase() === item.id.toLowerCase()
                ? styles.active
                : ""
            }
          >
            <Link to={item.to} onClick={() => setSelectedTab(item)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
