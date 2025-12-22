import { render, screen } from "@testing-library/react";
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
});
