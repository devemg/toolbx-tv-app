import styles from "./User.module.scss";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  const { ref, focused } = useFocusable({
    onEnterRelease: () => {
      navigate("/");
    },
  });

  return (
    <button
      ref={ref}
      className={`${styles.backButton} ${focused ? styles.focused : ""}`}
      onClick={() => navigate("/")}
    >
      <span className={styles.arrow}>←</span>
      <span>Back to Home</span>
    </button>
  );
};

export const UserPage = () => {
  const { ref, focusSelf, focusKey } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <div className="app-page">
      <FocusContext.Provider value={focusKey}>
        <div className={styles.userPage} ref={ref}>
          <header className={styles.header}>
            <BackButton />
          </header>
          <div className={styles.profileCardContainer}>
            <div className={styles.profileCard}>
            <div className={styles.avatar}>
              <span>U</span>
            </div>
            <div className={styles.info}>
              <h1>User Profile</h1>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <label>Name:</label>
                  <span>Emely Garcia</span>
                </div>
                <div className={styles.detail}>
                  <label>Email:</label>
                  <span>emely.garcia@example.com</span>
                </div>
                <div className={styles.detail}>
                  <label>Plan:</label>
                  <span>Premium</span>
                </div>
                <div className={styles.detail}>
                  <label>Member Since:</label>
                  <span>December 2025</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </FocusContext.Provider>
    </div>
  );
};
