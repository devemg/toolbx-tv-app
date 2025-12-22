import { CardList, ContentDescription, Header } from "@/components";
import styles from "./Content.module.scss";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useContent } from "@/contexts";
import { getContentList } from "@/queries/content.api";

export const ContentPage = () => {
  const params = useParams();
  const { contentList, setContentList, selectedContent, setSelectedTab } =
    useContent();
  const [displayContent, setDisplayContent] = useState(selectedContent);
  const [isExiting, setIsExiting] = useState(false);

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

  const setContent = useCallback(async (tab: string = "home") => {
    try {
      const content = await getContentList(tab);
      setContentList(content);
      setSelectedTab(tab);
    } catch (error) {
      console.error("Error setting content:", error);
    }
  }, [setContentList, setSelectedTab]);

  return (
    <div className="app-page">
      <Header />
      <div className={styles.pageView}>
        <div className={styles.cardLists}>
          {contentList.map((contentGroup) => (
            <CardList key={contentGroup.id} ratio="16x9" {...contentGroup} />
          ))}
        </div>
        {displayContent && (
          <ContentDescription content={displayContent} isExiting={isExiting} />
        )}
      </div>
    </div>
  );
};
