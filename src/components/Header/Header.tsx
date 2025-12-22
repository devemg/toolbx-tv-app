import { Link } from "react-router";
import styles from "./Header.module.scss";
import logo from "@assets/my-tv-logo.svg";

const navItems = [
  { to: "/home", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
  { to: "/kids", label: "Kids" },
];

export const Header = () => {
  return (
    <nav className={styles.header}>
      <Link to="/">
        <img src={logo} alt="App Logo" className={styles.logo} />
      </Link>

      <ul className={styles.itemsList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
