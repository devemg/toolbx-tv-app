import logo from "@assets/my-tv-logo.png";
import styles from "./NotFound.module.scss";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <img src={logo} alt="404 Page Not Found" />
      <p>Oh no! The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="btn primary-btn">Go to Home Page</button>
      </Link>
    </div>
  );
};
