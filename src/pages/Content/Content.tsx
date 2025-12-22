import { CardList, ContentDescription, Header } from "@/components";
import { mockContentResponse } from "@/test/data.mock";
import styles from "./Content.module.scss";

export const ContentPage = () => {
  return (
    <div className="app-page">
      <Header />
      <div className={styles.pageView}>
        <div className={styles.cardLists}>
          <CardList
            title="Continue Watching"
            ratio="16x9"
            contents={mockContentResponse.results}
          />
          <CardList
            title="Trending Now"
            ratio="16x9"
            contents={mockContentResponse.results}
          />
        </div>
        <ContentDescription content={mockContentResponse.results[0]} />
      </div>
    </div>
  );
};
