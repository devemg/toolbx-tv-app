import type { IContent } from "@/models/content";
import { Card } from "./Card";

interface CardListProps {
  title: string;
  contents: IContent[];
  showProgress?: boolean;
}

export const CardList: React.FC<CardListProps> = ({
  title,
  contents,
  showProgress,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {contents.map((content) => (
          <Card
            key={content.id}
            content={content}
            showProgress={showProgress}
          />
        ))}
      </div>
    </div>
  );
};
