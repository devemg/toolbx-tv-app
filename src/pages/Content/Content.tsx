import { CardList, ContentDescription, Header } from "@/components";
import styles from "./Content.module.scss";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useContent } from "@/contexts";
import { getContentList } from "@/queries/api/content.api";

export const ContentPage = () => {
  const params = useParams();
  const { contentList, setContentList, selectedContent, setSelectedTab } =
    useContent();
  const [displayContent, setDisplayContent] = useState(selectedContent);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedContent) {
      setDisplayContent(selectedContent);
      setIsExiting(false);
    } else if (displayContent) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setDisplayContent(null);
        setIsExiting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedContent]);

  useEffect(() => {
    setContent(params.tab);
  }, [params.tab]);

  const setContent = useCallback(
    async (tab: string = "home") => {
      try {
        setIsLoading(true);
        const content = await getContentList(tab, 1, tab === "kids" ? 3 : 2);
        setContentList(content);
        setSelectedTab(tab);
      } catch (error) {
        console.error("Error setting content:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setContentList, setSelectedTab]
  );

  return (
    <div className={styles.contentPage}>
      <Header />
      {isLoading ? (
        <div className="loading">
          <div className="spinner" aria-label="loading"></div>
        </div>
      ) : (
        <div className={styles.pageView}>
          <div className={styles.cardLists}>
            {contentList.map((contentGroup) => (
              <CardList key={contentGroup.id} ratio="16x9" {...contentGroup} />
            ))}
          </div>
          {displayContent && (
            <ContentDescription
              content={displayContent}
              isExiting={isExiting}
            />
          )}
        </div>
      )}
    </div>
  );
};
