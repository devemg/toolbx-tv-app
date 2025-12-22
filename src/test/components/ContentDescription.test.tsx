import { render, screen } from "@testing-library/react";
import { ContentDescription } from "@/components/ContentDescription/ContentDescription";
import type { IContent } from "@/models/content";
import { mockContent } from "../data.mock";

describe("ContentDescription Component", () => {
  describe("Rendering with content", () => {
    it("should render title when content is provided", () => {
      render(<ContentDescription content={mockContent} />);
      expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    });

    it("should render overview when content is provided", () => {
      render(<ContentDescription content={mockContent} />);
      expect(
        screen.getByText(/Two imprisoned men bond over a number of years/)
      ).toBeInTheDocument();
    });

    it("should render poster image when poster_path is provided", () => {
      render(<ContentDescription content={mockContent} />);
      const image = screen.getByAltText("The Shawshank Redemption");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500/test.jpg"
      );
    });

    it("should render release year when release_date is provided", () => {
      render(<ContentDescription content={mockContent} />);
      expect(screen.getByText("1994")).toBeInTheDocument();
    });

    it("should render all genres", () => {
      render(<ContentDescription content={mockContent} />);
      expect(screen.getByText("Drama")).toBeInTheDocument();
      expect(screen.getByText("Crime")).toBeInTheDocument();
    });
  });

  describe("Rendering without content", () => {
    it("should render without errors when content is undefined", () => {
      const { container } = render(<ContentDescription />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should not render title when content is undefined", () => {
      render(<ContentDescription />);
      const heading = screen.queryByRole("heading");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("");
    });
  });

  describe("Conditional rendering", () => {
    it("should not render image when poster_path is missing", () => {
      const contentWithoutPoster = {
        ...mockContent,
        poster_path: undefined,
      };
      render(<ContentDescription content={contentWithoutPoster} />);
      const image = screen.queryByRole("img");
      expect(image).not.toBeInTheDocument();
    });

    it("should not render release year when release_date is missing", () => {
      const contentWithoutDate = {
        ...mockContent,
        release_date: undefined as any,
      };
      render(<ContentDescription content={contentWithoutDate} />);
      expect(screen.queryByText("1994")).not.toBeInTheDocument();
    });

    it("should not render genres when genres array is undefined", () => {
      const contentWithoutGenres = {
        ...mockContent,
        genres: undefined,
      };
      render(<ContentDescription content={contentWithoutGenres} />);
      expect(screen.queryByText("Drama")).not.toBeInTheDocument();
      expect(screen.queryByText("Crime")).not.toBeInTheDocument();
    });

    it("should not render genres when genres array is empty", () => {
      const contentWithEmptyGenres = {
        ...mockContent,
        genres: [],
      };
      render(<ContentDescription content={contentWithEmptyGenres} />);
      expect(screen.queryByText("Drama")).not.toBeInTheDocument();
      expect(screen.queryByText("Crime")).not.toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("should not re-render when props remain the same", () => {
      const { rerender } = render(<ContentDescription content={mockContent} />);
      const firstRenderTitle = screen.getByText("The Shawshank Redemption");

      rerender(<ContentDescription content={mockContent} />);
      const secondRenderTitle = screen.getByText("The Shawshank Redemption");

      expect(firstRenderTitle).toBe(secondRenderTitle);
    });

    it("should re-render when content changes", () => {
      const { rerender } = render(<ContentDescription content={mockContent} />);
      expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();

      const newContent: IContent = {
        id: "tt0468569",
        media_type: "movie",
        title: "The Dark Knight",
        overview: "Batman fights the Joker",
        poster_path: "https://image.tmdb.org/t/p/w500/darknight.jpg",
        original_title: "The Dark Knight",
        original_language: "en",
        release_date: new Date("2008-07-18"),
      };

      rerender(<ContentDescription content={newContent} />);
      expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
      expect(
        screen.queryByText("The Shawshank Redemption")
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle content with very long overview", () => {
      const longOverviewContent = {
        ...mockContent,
        overview:
          "This is a very long overview that goes on and on with lots of details about the movie plot, characters, setting, and various other elements that make up the story. ".repeat(
            5
          ),
      };
      render(<ContentDescription content={longOverviewContent} />);
      const overview = screen.getByText(/This is a very long overview/);
      expect(overview).toBeInTheDocument();
    });

    it("should handle content with single genre", () => {
      const singleGenreContent = {
        ...mockContent,
        genres: [{ id: "18", name: "Drama" }],
      };
      render(<ContentDescription content={singleGenreContent} />);
      expect(screen.getByText("Drama")).toBeInTheDocument();
      expect(screen.queryByText("Crime")).not.toBeInTheDocument();
    });

    it("should handle content with many genres", () => {
      const manyGenresContent = {
        ...mockContent,
        genres: [
          { id: "18", name: "Drama" },
          { id: "80", name: "Crime" },
          { id: "53", name: "Thriller" },
          { id: "28", name: "Action" },
          { id: "12", name: "Adventure" },
        ],
      };
      render(<ContentDescription content={manyGenresContent} />);
      expect(screen.getByText("Drama")).toBeInTheDocument();
      expect(screen.getByText("Crime")).toBeInTheDocument();
      expect(screen.getByText("Thriller")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Adventure")).toBeInTheDocument();
    });

    it("should handle content with very old release date", () => {
      const oldContent = {
        ...mockContent,
        release_date: new Date("1920-06-15"),
      };
      render(<ContentDescription content={oldContent} />);
      expect(screen.getByText("1920")).toBeInTheDocument();
    });

    it("should handle content with future release date", () => {
      const futureContent = {
        ...mockContent,
        release_date: new Date("2030-06-15"),
      };
      render(<ContentDescription content={futureContent} />);
      expect(screen.getByText("2030")).toBeInTheDocument();
    });

    it("should handle minimal content with only required fields", () => {
      const minimalContent: IContent = {
        id: "tt1234567",
        media_type: "movie",
        title: "Minimal Movie",
        overview: "A minimal overview",
        original_title: "Minimal Movie",
        original_language: "en",
        release_date: new Date("2020-01-01"),
      };
      render(<ContentDescription content={minimalContent} />);
      expect(screen.getByText("Minimal Movie")).toBeInTheDocument();
      expect(screen.getByText("A minimal overview")).toBeInTheDocument();
    });

    it("should maintain genre order", () => {
      const { container } = render(
        <ContentDescription content={mockContent} />
      );
      const pills = Array.from(container.querySelectorAll("p")).filter((p) =>
        p.className.match(/pill/)
      );

      const genreTexts = pills.slice(1).map((p) => p.textContent); // Skip year pill
      expect(genreTexts).toEqual(["Drama", "Crime"]);
    });
  });
});
