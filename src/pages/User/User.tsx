import { useRemoteBack } from "@/navigation";
import styles from "./User.module.scss";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, memo } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { fetchUserData } from "@/queries/api/user.api";
import type { User } from "@/models/user";

const BackButton = memo(() => {
  const navigate = useNavigate();
  useRemoteBack(() => {
    navigate("/");
  });
  const { ref, focused } = useFocusable({
    onEnterRelease: () => {
      navigate("/");
    },
  });

  return (
    <button
      ref={ref}
      className={`btn primary-btn ${styles.backButton} ${focused ? "focused" : ""}`}
      onClick={() => navigate("/")}
    >
      <span className={styles.arrow}>←</span>
      <span>Back to Home</span>
    </button>
  );
});

export const UserPage = () => {
  const { ref, focusSelf, focusKey } = useFocusable();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    const fetchUserDataAsync = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAsync();
  }, []);
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
          {isLoading ? (
            <div className="loading">
              <div className="spinner" aria-label="loading"></div>
            </div>
          ) : (
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
                    <span>{userData?.name}</span>
                  </div>
                  <div className={styles.detail}>
                    <label>Email:</label>
                    <span>{userData?.email}</span>
                  </div>
                  <div className={styles.detail}>
                    <label>Plan:</label>
                    <span>{userData?.plan}</span>
                  </div>
                  <div className={styles.detail}>
                    <label>Member Since:</label>
                    <span>{userData?.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </FocusContext.Provider>
    </div>
  );
};
