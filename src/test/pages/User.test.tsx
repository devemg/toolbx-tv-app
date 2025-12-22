import { render, screen } from "@testing-library/react";
import { UserPage } from "@/pages/User/User";
import { BrowserRouter } from "react-router";

// Mock navigation hooks
const mockNavigate = vi.fn();
const mockUseRemoteBack = vi.fn();
const mockState = {
  focused: false,
  onEnterReleaseCallback: null as (() => void) | null,
};

vi.mock("react-router", () => ({
  BrowserRouter: ({ children }: any) => children,
  useNavigate: () => mockNavigate,
}));

vi.mock("@/navigation", () => ({
  useRemoteBack: (callback: any) => mockUseRemoteBack(callback),
}));

vi.mock("@noriginmedia/norigin-spatial-navigation", () => ({
  useFocusable: (config?: any) => {
    if (config?.onEnterRelease) {
      mockState.onEnterReleaseCallback = config.onEnterRelease;
    }

    return {
      ref: { current: null },
      get focused() {
        return mockState.focused;
      },
      focusSelf: vi.fn(),
      focusKey: "test-focus-key",
    };
  },
  FocusContext: {
    Provider: ({ children }: any) => children,
  },
}));

describe("UserPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseRemoteBack.mockClear();
    mockState.focused = false;
    mockState.onEnterReleaseCallback = null;
  });

  it("should render user profile information", () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("Emely Garcia")).toBeInTheDocument();
    expect(screen.getByText("emely.garcia@example.com")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("December 2025")).toBeInTheDocument();
  });

  it("should render back button", () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("should navigate to home when back button is clicked", () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    const backButton = screen.getByText("Back to Home").closest("button");
    backButton?.click();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should render profile avatar", () => {
    const { container } = render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    const avatar = container.querySelector('[class*="avatar"]');
    expect(avatar).toBeInTheDocument();
    expect(avatar?.textContent).toBe("U");
  });

  it("should render all profile details", () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Plan:")).toBeInTheDocument();
    expect(screen.getByText("Member Since:")).toBeInTheDocument();
  });

  it("should navigate to home when onEnterRelease is triggered on back button", () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    // Trigger the onEnterRelease callback
    mockState.onEnterReleaseCallback?.();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should register useRemoteBack callback that navigates to home", () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    // Verify useRemoteBack was called with a callback
    expect(mockUseRemoteBack).toHaveBeenCalled();
    
    // Get the callback that was passed to useRemoteBack
    const remoteBackCallback = mockUseRemoteBack.mock.calls[0][0];
    
    // Trigger the callback
    remoteBackCallback();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should apply focused class to back button when focused", () => {
    mockState.focused = true;

    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    const backButton = screen.getByText("Back to Home").closest("button");
    expect(backButton?.className).toMatch(/focused/);
  });
});
