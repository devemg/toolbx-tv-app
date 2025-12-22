import { render, screen, waitFor } from "@testing-library/react";
import { ContentPage } from "@/pages/Content/Content";
import { BrowserRouter } from "react-router";
import { mockContentResponse } from "../data.mock";

// Mock modules
const mockSetContentList = vi.fn();
const mockSetSelectedTab = vi.fn();
const mockUseParams = vi.fn();
const mockGetContentList = vi.fn();
const mockState = {
  selectedContent: null as any,
};

vi.mock("react-router", () => ({
  BrowserRouter: ({ children }: any) => children,
  useParams: () => mockUseParams(),
}));

vi.mock("@/contexts", () => ({
  useContent: () => ({
    contentList: mockContentResponse.results,
    setContentList: mockSetContentList,
    get selectedContent() {
      return mockState.selectedContent;
    },
    setSelectedTab: mockSetSelectedTab,
  }),
}));

vi.mock("@/queries/content.api", () => ({
  getContentList: (...args: any[]) => mockGetContentList(...args),
}));

vi.mock("@/components", () => ({
  Header: () => <div data-testid="header">Header</div>,
  CardList: ({ title, id }: any) => (
    <div data-testid={`cardlist-${id}`}>{title}</div>
  ),
  ContentDescription: ({ content, isExiting }: any) => (
    <div data-testid="content-description" data-exiting={isExiting}>
      {content.title}
    </div>
  ),
}));

describe("ContentPage", () => {
  beforeEach(() => {
    mockSetContentList.mockClear();
    mockSetSelectedTab.mockClear();
    mockGetContentList.mockClear();
    mockUseParams.mockReturnValue({ tab: "home" });
    mockGetContentList.mockResolvedValue(mockContentResponse);
    mockState.selectedContent = null;
  });

  it("should render the header", () => {
    render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });


  it("should fetch content on mount with tab parameter", async () => {
    mockUseParams.mockReturnValue({ tab: "movies" });

    render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetContentList).toHaveBeenCalledWith("movies");
      expect(mockSetContentList).toHaveBeenCalledWith(mockContentResponse);
      expect(mockSetSelectedTab).toHaveBeenCalledWith("movies");
    });
  });

  it("should default to 'home' tab when no parameter provided", async () => {
    mockUseParams.mockReturnValue({});

    render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetContentList).toHaveBeenCalledWith("home");
    });
  });

  it("should not render content description when no content selected", () => {
    render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    expect(screen.queryByTestId("content-description")).not.toBeInTheDocument();
  });

  it("should handle API errors gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockGetContentList.mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error setting content:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should display content description when selectedContent is set", () => {
    mockState.selectedContent = mockContentResponse.results[0];

    render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    const description = screen.getByTestId("content-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("The Shawshank Redemption");
    expect(description).toHaveAttribute("data-exiting", "false");
  });

  it("should set isExiting to true when selectedContent becomes null", async () => {
    mockState.selectedContent = mockContentResponse.results[0];

    const { rerender } = render(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    // Content should be visible
    expect(screen.getByTestId("content-description")).toBeInTheDocument();

    // Change selectedContent to null
    mockState.selectedContent = null;

    rerender(
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
    );

    // Content should still be visible but with isExiting=true
    await waitFor(() => {
      const description = screen.getByTestId("content-description");
      expect(description).toHaveAttribute("data-exiting", "true");
    });
  });

});
