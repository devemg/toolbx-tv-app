import { CardList, ContentDescription, Header } from "@/components";
import styles from "./Content.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useContent } from "@/contexts";
import { getContentList } from "@/queries/content.api";

export const ContentPage = () => {
  const params = useParams();
  const { contentList, setContentList, selectedContent } = useContent();

  useEffect(() => {
    setContent(params.tab);
  }, [params.tab]);

  const setContent = async (tab: string = "home") => {
    try {
      const content = await getContentList(tab);
      setContentList(content);
    } catch (error) {
      console.error("Error setting content:", error);
    }
  };

  return (
    <div className="app-page">
      <Header />
      <div className={styles.pageView}>
        <div className={styles.cardLists}>
          {contentList.map((contentGroup) => (
            <CardList key={contentGroup.id} ratio="16x9" {...contentGroup} />
          ))}
        </div>
        {selectedContent && <ContentDescription content={selectedContent} />}
      </div>
    </div>
  );
};
