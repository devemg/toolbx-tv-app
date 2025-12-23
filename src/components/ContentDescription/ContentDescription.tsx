import styles from "./ContentDesc.module.scss";
import { memo, useEffect, useMemo, useState } from "react";
import type { IContent } from "@/models/content";

interface ContentDescriptionProps {
  content?: IContent;
  isExiting?: boolean;
}

export const ContentDescription: React.FC<ContentDescriptionProps> = memo(
  ({ content, isExiting = false }) => {
    const [imageUrl, setImageUrl] = useState(content?.poster_path);

    useEffect(() => {
      setImageUrl(content?.poster_path);
    }, [content]);

    const releaseYear = useMemo(() => {
      if (content?.release_date) {
       try {
          return new Date(content.release_date).getFullYear();
       } catch {
          return null;
       }
      }
    }, [content]);

    return (
      <div className={`${styles.content} ${isExiting ? styles.exiting : ""}`}>
        {imageUrl && (
          <img
            src={imageUrl}
            onError={() => {
              setImageUrl("");
            }}
            alt={content?.title}
          />
        )}
        <div>
          <h2 className={styles.title}>{content?.title}</h2>
          <p className={styles.description}>{content?.overview}</p>
          <div className={styles.pillContainer}>
            {releaseYear && <p className={styles.pill}>{releaseYear}</p>}
            {content?.genres &&
              content.genres.length > 0 &&
              content.genres.map((genre) => (
                <p key={genre.id} className={styles.pill}>
                  {genre.name}
                </p>
              ))}
          </div>
        </div>
      </div>
    );
  }
);
