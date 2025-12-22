import type { IContent } from "@/models/content";
import { Card } from "./Card";
import styles from "./CardList.module.scss";
import type { CardRatio } from "@/models/ui";
import { memo } from "react";

interface CardListProps {
  title: string;
  contents: IContent[];
  ratio?: CardRatio;
  showProgress?: boolean;
}

export const CardList: React.FC<CardListProps> = memo(
  ({ title, contents, showProgress, ratio = "4x3" }) => {
    return (
      <div className={styles.cardList}>
        <h2>{title}</h2>
        <div>
          {contents.map((content) => (
            <Card
              key={content.id}
              content={content}
              showProgress={showProgress}
              ratio={ratio}
            />
          ))}
        </div>
      </div>
    );
  }
);
