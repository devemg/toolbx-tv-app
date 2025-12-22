import type { IContent } from "@/models/content";
import styles from "./Card.module.scss";
import type { CardRatio } from "@/models/ui";
import { useMemo, memo, useState } from "react";
import placeholderImage from "@/assets/my-tv-logo.svg";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

interface CardProps {
  content: IContent;
  ratio?: CardRatio;
  showProgress?: boolean;
  onClick?: (content: IContent) => void;
  onFocus?: (content: IContent) => void;
}
export const Card: React.FC<CardProps> = memo(
  ({ content, showProgress, ratio = "4x3", onClick, onFocus }) => {
    const { ref, focused } = useFocusable({
      onFocus: () => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        if (onFocus) {
          onFocus(content);
        }
      },
    });
    const [imageUrl, setImageUrl] = useState(
      content.backdrop_path ?? content.poster_path
    );

    const progressPercentage = useMemo(() => {
      if (
        !content.currentViewTime ||
        !content.duration ||
        content.duration === 0
      )
        return 0;
      return (content.currentViewTime / content.duration) * 100;
    }, [content.currentViewTime, content.duration]);

    return (
      <div
        ref={ref}
        className={`${styles[`card-${ratio}`]} ${
          focused ? styles.focused : ""
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={content.title}
            onError={() => {
              if (
                imageUrl === content.backdrop_path &&
                imageUrl !== content.poster_path
              ) {
                setImageUrl(content.poster_path);
              } else {
              }
            }}
            onClick={() => onClick && onClick(content)}
          />
        ) : (
          <div
            className={styles.placeholderContainer}
            onClick={() => onClick && onClick(content)}
          >
            <img
              className={styles.placeholder}
              src={placeholderImage}
              alt={content.title}
            />
          </div>
        )}
        <h2 onClick={() => onClick && onClick(content)}>{content.title}</h2>
        {showProgress && (
          <div className={styles.progressBar}>
            <span
              style={{
                width: `${progressPercentage}%`,
              }}
            ></span>
          </div>
        )}
      </div>
    );
  }
);
