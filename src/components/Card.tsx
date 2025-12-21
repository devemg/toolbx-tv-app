import type { IContent } from "@/models/content"

interface CardProps {
  content: IContent;
  showProgress?: boolean;
}
export const Card: React.FC<CardProps> = ({ content, showProgress }) => {
  return (
    <div>
      <img src={content.poster_path} alt={content.title} />
      <h2>{content.title}</h2>
      {showProgress && content.progress !== undefined && (
        <p>Progress: {content.progress}%</p>
      )}
    </div>
  )
}
