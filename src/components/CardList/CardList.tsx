import type { IContent, IContentList } from "@/models/content";
import { Card } from "./Card";
import styles from "./CardList.module.scss";
import type { CardRatio } from "@/models/ui";
import { memo, useRef, useState, useEffect, useCallback } from "react";
import { useContent } from "@/contexts";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { CONTENT_LIST_FOCUS_KEY } from "@/navigation/keys";

interface CardListProps extends IContentList {
  ratio?: CardRatio;
  showProgress?: boolean;
}

export const CardList: React.FC<CardListProps> = memo(
  ({ title, contents, showProgress, ratio = "4x3", id }) => {
    const { setSelectedContent, selectedContent } = useContent();
    const { ref, focusKey, hasFocusedChild } = useFocusable({
      focusKey: `${CONTENT_LIST_FOCUS_KEY}-${id}`,
      trackChildren: true,
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const lastContentRef = useRef<IContent | null>(null);
    const [showArrows, setShowArrows] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Clear selected content only if it was set by this CardList when focus leaves
    useEffect(() => {
      if (!hasFocusedChild && selectedContent && lastContentRef.current === selectedContent) {
        setSelectedContent(null);
        lastContentRef.current = null;
      }
    }, [hasFocusedChild, selectedContent, setSelectedContent]);

    const handleClick = useCallback((content: IContent) => {
      lastContentRef.current = content;
      setSelectedContent(content);
    }, [setSelectedContent]);

    const handleFocus = useCallback((content: IContent) => {
      lastContentRef.current = content;
      setSelectedContent(content);
    }, [setSelectedContent]);

    const checkScrollPosition = useCallback(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    }, []);

    useEffect(() => {
      checkScrollPosition();
      const container = containerRef.current;
      if (container) {
        container.addEventListener("scroll", checkScrollPosition);
        return () =>
          container.removeEventListener("scroll", checkScrollPosition);
      }
    }, [contents]);

    const scroll = useCallback((direction: "left" | "right") => {
      if (containerRef.current) {
        const scrollAmount = containerRef.current.clientWidth * 0.8;
        containerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }, []);

    return (
      <FocusContext.Provider value={focusKey}>
        <div
          className={styles.cardList}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <h2>{title}</h2>
          <div className={styles.cardsWrapper} ref={ref}>
            {showArrows && canScrollLeft && (
              <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                ‹
              </button>
            )}
            {showArrows && canScrollRight && (
              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={() => scroll("right")}
                aria-label="Scroll right"
              >
                ›
              </button>
            )}
            <div ref={containerRef} className={styles.cardsContainer}>
              {contents.map((content) => (
                <Card
                  key={content.id}
                  content={content}
                  showProgress={showProgress}
                  ratio={ratio}
                  onClick={handleClick}
                  onFocus={handleFocus}
                />
              ))}
            </div>
          </div>
        </div>
      </FocusContext.Provider>
    );
  }
);
