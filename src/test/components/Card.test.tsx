import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "@/components/CardList/Card";
import { mockContent } from "../data.mock";

// Mock the navigation hook
const mockState = {
  focused: false,
  onFocusCallback: null as (() => void) | null,
  onEnterCallback: null as (() => void) | null,
};

vi.mock("@/navigation", () => ({
  useFocusableMagic: (config: any) => {
    mockState.onFocusCallback = config?.onFocus || null;
    mockState.onEnterCallback = config?.onEnterRelease || null;
    
    return {
      ref: { 
        current: {
          scrollIntoView: () => {},
        }
      },
      get focused() {
        return mockState.focused;
      },
    };
  },
}));

describe("Card Component", () => {
  beforeEach(() => {
    mockState.focused = false;
    mockState.onFocusCallback = null;
    mockState.onEnterCallback = null;
  });
  it("should render card with title and image", () => {
    render(<Card content={mockContent} />);
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    const image = screen.getByAltText("The Shawshank Redemption");
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w1280/test.jpg"
    );
  });

  it("should render with correct ratio class", () => {
    const { container, rerender } = render(<Card content={mockContent} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/card-4x3/);

    rerender(<Card content={mockContent} ratio="16x9" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/card-16x9/);
  });

  it("should calculate progress percentage correctly", () => {
    const { container, rerender } = render(
      <Card content={mockContent} showProgress />
    );
    let progressSpan = container.querySelector("div > div > span");
    expect(progressSpan).toHaveStyle({ width: "50%" });

    // 0% progress
    rerender(
      <Card content={{ ...mockContent, currentViewTime: 0 }} showProgress />
    );
    progressSpan = container.querySelector("div > div > span");
    expect(progressSpan).toHaveStyle({ width: "0%" });

    // 100% progress
    rerender(
      <Card content={{ ...mockContent, currentViewTime: 8520 }} showProgress />
    );
    progressSpan = container.querySelector("div > div > span");
    expect(progressSpan).toHaveStyle({ width: "100%" });
  });

  it("should show placeholder when image is missing", () => {
    const noImageContent = {
      ...mockContent,
      backdrop_path: undefined,
      poster_path: undefined,
    };
    render(<Card content={noImageContent} />);
    const image = screen.getByAltText("The Shawshank Redemption");
    expect(image.getAttribute("src")).toMatch("data:image/svg+xml");
  });

  it("should apply focused class when focused", () => {
    // Test not focused state
    mockState.focused = false;
    const { container: containerNotFocused } = render(<Card content={mockContent} />);
    expect((containerNotFocused.firstChild as HTMLElement).className).not.toMatch(/focused/);
    
    // Test focused state - need to unmount and remount with new mock state
    mockState.focused = true;
    const { container: containerFocused } = render(<Card content={mockContent} />);
    expect((containerFocused.firstChild as HTMLElement).className).toMatch(/focused/);
  });

  it("should call onClick when onEnterRelease is triggered", () => {
    const onClickMock = vi.fn();
    render(<Card content={mockContent} onClick={onClickMock} />);
    
    // Trigger the onEnterRelease callback captured by the mock
    expect(mockState.onEnterCallback).toBeDefined();
    mockState.onEnterCallback?.();
    
    expect(onClickMock).toHaveBeenCalledWith(mockContent);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should fallback to poster_path when backdrop_path fails", () => {
    const contentWithBothImages = {
      ...mockContent,
      backdrop_path: "https://image.tmdb.org/t/p/w1280/backdrop.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/poster.jpg",
    };
    
    render(<Card content={contentWithBothImages} />);
    const image = screen.getByAltText("The Shawshank Redemption") as HTMLImageElement;
    
    // Initially shows backdrop
    expect(image.src).toBe("https://image.tmdb.org/t/p/w1280/backdrop.jpg");
    
    // Trigger error on backdrop
    fireEvent.error(image);
    
    // Should fallback to poster
    expect(image.src).toBe("https://image.tmdb.org/t/p/w500/poster.jpg");
  });

  it("should show placeholder when both images fail", () => {
    const contentWithBothImages = {
      ...mockContent,
      backdrop_path: "https://image.tmdb.org/t/p/w1280/backdrop.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/poster.jpg",
    };
    
    const { rerender } = render(<Card content={contentWithBothImages} />);
    const image = screen.getByAltText("The Shawshank Redemption") as HTMLImageElement;
    
    // Trigger error on backdrop (fallback to poster)
    fireEvent.error(image);
    
    // Re-render to get the new image element after state change
    rerender(<Card content={contentWithBothImages} />);
    const posterImage = screen.getAllByAltText("The Shawshank Redemption")[0] as HTMLImageElement;
    
    // Trigger error on poster
    fireEvent.error(posterImage);
    
    // Should show placeholder
    rerender(<Card content={contentWithBothImages} />);
    const placeholderImage = screen.getAllByAltText("The Shawshank Redemption").find(
      img => img.getAttribute("src")?.includes("data:image/svg+xml")
    );
    expect(placeholderImage).toBeDefined();
  });
});
