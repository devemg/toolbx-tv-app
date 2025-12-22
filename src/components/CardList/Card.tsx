import type { IContent } from "@/models/content";
import styles from "./Card.module.scss";
import type { CardRatio } from "@/models/ui";
import { useMemo, memo } from "react";
import placeholderImage from "@/assets/my-tv-logo.svg";

interface CardProps {
  content: IContent;
  ratio?: CardRatio;
  showProgress?: boolean;
}
export const Card: React.FC<CardProps> = memo(({ content, ratio = "4x3" }) => {
  const progressPercentage = useMemo(() => {
    if (!content.currentViewTime || !content.duration || content.duration === 0)
      return 0;
    return (content.currentViewTime / content.duration) * 100;
  }, [content.currentViewTime, content.duration]);

  return (
    <div className={`${styles[`card-${ratio}`]}`}>
      {content.backdrop_path ? (
        <img src={content.backdrop_path} alt={content.title} />
      ) : (
        <div className={styles.placeholderContainer}>
          <img className={styles.placeholder} src={placeholderImage} alt={content.title} />
        </div>
      )}
      <h2>{content.title}</h2>
      <div className={styles.progressBar}>
        <span
          style={{
            width: `${progressPercentage}%`,
          }}
        ></span>
      </div>
    </div>
  );
});
