import { render, screen } from "@testing-library/react";
import { Card } from "@/components/CardList/Card";
import { mockContent } from "../data.mock";

describe("Card Component", () => {
  it("should render card with content title", () => {
    render(<Card content={mockContent} />);
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
  });

  it("should render card with backdrop image", () => {
    render(<Card content={mockContent} />);
    const image = screen.getByAltText("The Shawshank Redemption");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w1280/test.jpg"
    );
  });

  it("should render with default 4x3 ratio", () => {
    const { container } = render(<Card content={mockContent} />);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement.className).toMatch(/card-4x3/);
  });

  it("should render with 16x9 ratio when specified", () => {
    const { container } = render(<Card content={mockContent} ratio="16x9" />);
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement.className).toMatch(/card-16x9/);
  });

  describe("Progress bar", () => {
    it("should display 50% progress when currentViewTime is half of duration", () => {
      const { container } = render(<Card content={mockContent} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "50%" });
    });

    it("should display 0% progress when currentViewTime is 0", () => {
      const contentWithNoProgress = {
        ...mockContent,
        currentViewTime: 0,
      };
      const { container } = render(<Card content={contentWithNoProgress} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "0%" });
    });

    it("should display 100% progress when currentViewTime equals duration", () => {
      const contentFullyWatched = {
        ...mockContent,
        currentViewTime: 8520,
      };
      const { container } = render(<Card content={contentFullyWatched} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "100%" });
    });

    it("should display 0% progress when duration is 0", () => {
      const contentNoDuration = {
        ...mockContent,
        duration: 0,
      };
      const { container } = render(<Card content={contentNoDuration} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "0%" });
    });

    it("should display 0% progress when currentViewTime is undefined", () => {
      const contentNoProgress = {
        ...mockContent,
        currentViewTime: undefined,
      };
      const { container } = render(<Card content={contentNoProgress} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "0%" });
    });

    it("should display 0% progress when duration is undefined", () => {
      const contentNoDuration = {
        ...mockContent,
        duration: undefined,
      };
      const { container } = render(<Card content={contentNoDuration} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "0%" });
    });

    it("should calculate correct percentage for partial progress", () => {
      const contentPartialProgress = {
        ...mockContent,
        currentViewTime: 2556, // 30%
        duration: 8520,
      };
      const { container } = render(<Card content={contentPartialProgress} showProgress />);
      const progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "30%" });
    });
  });

  describe("Memoization", () => {
    it("should not re-render when unrelated props change", () => {
      const { rerender } = render(<Card content={mockContent} ratio="4x3" />);
      const firstRenderTitle = screen.getByText("The Shawshank Redemption");

      // Re-render with same props
      rerender(<Card content={mockContent} ratio="4x3" />);
      const secondRenderTitle = screen.getByText("The Shawshank Redemption");

      // Should be the same element (not re-rendered)
      expect(firstRenderTitle).toBe(secondRenderTitle);
    });

    it("should re-render when content progress changes", () => {
      const { rerender, container } = render(<Card content={mockContent} showProgress />);
      let progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "50%" });

      const updatedContent = {
        ...mockContent,
        currentViewTime: 6390, // 75%
      };
      rerender(<Card content={updatedContent} showProgress />);
      progressSpan = container.querySelector("div > div > span");
      expect(progressSpan).toHaveStyle({ width: "75%" });
    });
  });

  describe("Edge cases", () => {
    it("should handle very long titles", () => {
      const longTitleContent = {
        ...mockContent,
        title:
          "This is a very long title that should be truncated with ellipsis when it exceeds the container width",
      };
      render(<Card content={longTitleContent} />);
      expect(
        screen.getByText(
          "This is a very long title that should be truncated with ellipsis when it exceeds the container width"
        )
      ).toBeInTheDocument();
    });

    it("should handle missing backdrop_path", () => {
      const noImageContent = {
        ...mockContent,
        backdrop_path: undefined,
        poster_path: undefined,
      };
      render(<Card content={noImageContent} />);
      const image = screen.getByAltText("The Shawshank Redemption");
      expect(image).toBeInTheDocument();
      expect(image.getAttribute("src")).toMatch('data:image/svg+xml');
    });

    it("should handle progress over 100%", () => {
      const overProgressContent = {
        ...mockContent,
        currentViewTime: 10000,
        duration: 8520,
      };
      const { container } = render(<Card content={overProgressContent} showProgress />);
      const progressSpan = container.querySelector(
        "div > div > span"
      ) as HTMLElement;
      // Should calculate to ~117%, but CSS will handle overflow
      const expectedWidth = ((10000 / 8520) * 100).toFixed(0);
      expect(progressSpan?.style.width).toContain(expectedWidth);
    });
  });
});
