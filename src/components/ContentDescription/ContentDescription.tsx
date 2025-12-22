import styles from "./ContentDesc.module.scss";
import { memo, useEffect, useState } from "react";
import type { IContent } from "@/models/content";

interface ContentDescriptionProps {
  content?: IContent;
}

export const ContentDescription: React.FC<ContentDescriptionProps> = memo(
  ({ content }) => {
    const [imageUrl, setImageUrl] = useState(content?.poster_path);

    useEffect(() => {
      setImageUrl(content?.poster_path);
    }, [content]);

    return (
      <div className={styles.content}>
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
            {content?.release_date && (
              <p className={styles.pill}>
                {content?.release_date.getFullYear()}
              </p>
            )}
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
