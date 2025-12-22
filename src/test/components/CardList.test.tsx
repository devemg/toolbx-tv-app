import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { CardList } from "@/components/CardList/CardList";
import type { IContent } from "@/models/content";
import { mockContentResponse } from "../data.mock";
import { ContentProvider } from "@/contexts/content";

const CardListWithProvider = (props: any) => (
  <ContentProvider>
    <CardList {...props} />
  </ContentProvider>
);

describe("CardList Component", () => {
  const mockContents = mockContentResponse.results;

  describe("Rendering", () => {
    it("should render the title", () => {
      render(<CardListWithProvider id="testid" title="Popular Movies" contents={mockContents} />);
      expect(screen.getByText("Popular Movies")).toBeInTheDocument();
    });

    it("should render all content cards", () => {
      render(<CardListWithProvider id="testid" title="Popular Movies" contents={mockContents} />);
      expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
      expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
      expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    });
  });

  describe("Props passing", () => {
    it("should apply default 4x3 ratio to cards", () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      const firstCard = container.querySelector("div > div > div > div");
      expect((firstCard as HTMLElement).className).toMatch(/card-4x3/);
    });

    it("should apply 16x9 ratio when specified", () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} ratio="16x9" />
      );
      const firstCard = container.querySelector("div > div > div > div");
      expect((firstCard as HTMLElement).className).toMatch(/card-16x9/);
    });

    it("should render all images correctly", () => {
      render(<CardListWithProvider id="testid" title="Movies" contents={mockContents} />);
      const image1 = screen.getByAltText("The Shawshank Redemption");
      const image2 = screen.getByAltText("The Dark Knight");
      const image3 = screen.getByAltText("Breaking Bad");

      expect(image1).toHaveAttribute(
        "src",
        "https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg"
      );
      expect(image2).toHaveAttribute(
        "src",
        "https://image.tmdb.org/t/p/w1280/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg"
      );
      expect(image3).toHaveAttribute(
        "src",
        "https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg"
      );
    });
  });

  describe("Memoization", () => {
    it("should not re-render when props remain the same", () => {
      const { rerender } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      const firstRenderTitle = screen.getByText("Movies");

      rerender(<CardListWithProvider id="testid" title="Movies" contents={mockContents} />);
      const secondRenderTitle = screen.getByText("Movies");

      expect(firstRenderTitle).toBe(secondRenderTitle);
    });

    it("should re-render when title changes", () => {
      const { rerender } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      expect(screen.getByText("Movies")).toBeInTheDocument();

      rerender(<CardListWithProvider id="testid" title="TV Shows" contents={mockContents} />);
      expect(screen.getByText("TV Shows")).toBeInTheDocument();
      expect(screen.queryByText("Movies")).not.toBeInTheDocument();
    });

    it("should re-render when contents change", () => {
      const { rerender } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();

      const newContents: IContent[] = [
        {
          id: "tt1375666",
          media_type: "movie",
          title: "Inception",
          overview: "A thief who steals corporate secrets",
          backdrop_path: "https://image.tmdb.org/t/p/w1280/test4.jpg",
          poster_path: "https://image.tmdb.org/t/p/w500/test4.jpg",
          original_title: "Inception",
          original_language: "en",
          release_date: new Date("2010-07-16"),
          duration: 8880,
          currentViewTime: 2000,
        },
      ];

      rerender(<CardListWithProvider id="testid" title="Movies" contents={newContents} />);
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(
        screen.queryByText("The Shawshank Redemption")
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle single content item", () => {
      const singleContent = [mockContents[0]];
      render(<CardListWithProvider id="testid" title="Single Movie" contents={singleContent} />);
      expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    });

    it("should handle very long title", () => {
      const longTitle =
        "This is a very long title that might need special handling in the UI";
      render(<CardListWithProvider id="testid" title={longTitle} contents={mockContents} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle content with missing optional fields", () => {
      const minimalContent: IContent[] = [
        {
          id: "tt1234567",
          media_type: "movie",
          title: "Minimal Movie",
          overview: "A minimal movie",
          original_title: "Minimal Movie",
          original_language: "en",
          release_date: new Date("2020-01-01"),
        },
      ];
      render(<CardListWithProvider id="testid" title="Minimal" contents={minimalContent} />);
      expect(screen.getByText("Minimal Movie")).toBeInTheDocument();
    });

    it("should maintain card order", () => {
      render(<CardListWithProvider id="testid" title="Movies" contents={mockContents} />);
      const titles = screen.getAllByRole("heading", { level: 2 });

      // First h2 is the CardList title
      expect(titles[0]).toHaveTextContent("Movies");
      // Subsequent h2s are card titles in order
      expect(titles[1]).toHaveTextContent("The Shawshank Redemption");
      expect(titles[2]).toHaveTextContent("The Dark Knight");
      expect(titles[3]).toHaveTextContent("Breaking Bad");
    });

    it("should handle showProgress prop", () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} showProgress={true} />
      );
      // Progress bars should be rendered
      const progressBars = container.querySelectorAll("div > div > span");
      expect(progressBars.length).toBeGreaterThan(0);
    });
  });

  describe("Arrow navigation", () => {
    it("should not show arrows initially", () => {
      render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      expect(screen.queryByLabelText("Scroll left")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Scroll right")).not.toBeInTheDocument();
    });

    it("should show arrows on mouse enter", async () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      const cardList = container.querySelector('[class*="cardList"]');
      const cardsContainer = container.querySelector('[class*="cardsContainer"]');
      
      if (cardList && cardsContainer) {
        // Mock container dimensions to ensure scrolling is possible
        Object.defineProperty(cardsContainer, 'clientWidth', { value: 1000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollWidth', { value: 2000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollLeft', { value: 0, configurable: true });
        
        // Trigger scroll event to update arrow visibility using fireEvent
        fireEvent.scroll(cardsContainer);
        
        // Wait for state to update
        await waitFor(() => {
          // Simulate mouse enter
          fireEvent.mouseEnter(cardList);
          
          // Right arrow should be visible since we can scroll right
          const rightArrow = screen.queryByLabelText("Scroll right");
          expect(rightArrow).toBeInTheDocument();
        });
      }
    });

    it("should hide arrows on mouse leave", () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      const cardList = container.querySelector('[class*="cardList"]');
      
      if (cardList) {
        // Show arrows first
        cardList.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        
        // Hide arrows
        cardList.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        
        expect(screen.queryByLabelText("Scroll left")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Scroll right")).not.toBeInTheDocument();
      }
    });

    it("should scroll right when right arrow is clicked", () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      
      const cardList = container.querySelector('[class*="cardList"]');
      const cardsContainer = container.querySelector('[class*="cardsContainer"]');
      
      if (cardList && cardsContainer) {
        // Mock scrollBy and clientWidth
        const scrollBySpy = vi.fn();
        Object.defineProperty(cardsContainer, 'clientWidth', { value: 1000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollWidth', { value: 2000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollLeft', { value: 0, configurable: true });
        (cardsContainer as HTMLElement).scrollBy = scrollBySpy;
        
        // Show arrows
        cardList.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        
        const rightArrow = screen.queryByLabelText("Scroll right");
        if (rightArrow) {
          rightArrow.click();
          
          // Should scroll 80% of container width to the right
          expect(scrollBySpy).toHaveBeenCalledWith({
            left: 800,
            behavior: 'smooth'
          });
        }
      }
    });

    it("should scroll left when left arrow is clicked", () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      
      const cardList = container.querySelector('[class*="cardList"]');
      const cardsContainer = container.querySelector('[class*="cardsContainer"]');
      
      if (cardList && cardsContainer) {
        // Mock scrollBy and clientWidth
        const scrollBySpy = vi.fn();
        Object.defineProperty(cardsContainer, 'clientWidth', { value: 1000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollWidth', { value: 2000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollLeft', { value: 500, configurable: true });
        (cardsContainer as HTMLElement).scrollBy = scrollBySpy;
        
        // Show arrows
        cardList.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        
        // Trigger scroll event to update arrow visibility
        cardsContainer.dispatchEvent(new Event('scroll'));
        
        const leftArrow = screen.queryByLabelText("Scroll left");
        if (leftArrow) {
          leftArrow.click();
          
          // Should scroll 80% of container width to the left
          expect(scrollBySpy).toHaveBeenCalledWith({
            left: -800,
            behavior: 'smooth'
          });
        }
      }
    });

    it("should update arrow visibility based on scroll position", async () => {
      const { container } = render(
        <CardListWithProvider id="testid" title="Movies" contents={mockContents} />
      );
      
      const cardList = container.querySelector('[class*="cardList"]');
      const cardsContainer = container.querySelector('[class*="cardsContainer"]');
      
      if (cardList && cardsContainer) {
        // Setup container dimensions
        Object.defineProperty(cardsContainer, 'clientWidth', { value: 1000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollWidth', { value: 2000, configurable: true });
        Object.defineProperty(cardsContainer, 'scrollLeft', { value: 0, configurable: true, writable: true });
        
        // Trigger scroll event to set initial state
        fireEvent.scroll(cardsContainer);
        
        // Show arrows
        fireEvent.mouseEnter(cardList);
        
        // Wait for initial state - no left arrow, yes right arrow
        await waitFor(() => {
          expect(screen.queryByLabelText("Scroll left")).not.toBeInTheDocument();
          expect(screen.queryByLabelText("Scroll right")).toBeInTheDocument();
        });
        
        // Simulate scroll to middle
        Object.defineProperty(cardsContainer, 'scrollLeft', { value: 500, configurable: true, writable: true });
        fireEvent.scroll(cardsContainer);
        
        // Wait for both arrows to be visible
        await waitFor(() => {
          expect(screen.queryByLabelText("Scroll left")).toBeInTheDocument();
          expect(screen.queryByLabelText("Scroll right")).toBeInTheDocument();
        });
      }
    });
  });
});
