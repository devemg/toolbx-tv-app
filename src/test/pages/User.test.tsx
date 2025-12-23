import { render, screen, waitFor } from "@testing-library/react";
import { UserPage } from "@/pages/User/User";
import { BrowserRouter } from "react-router";

// Mock navigation hooks
const mockNavigate = vi.fn();
const mockUseRemoteBack = vi.fn();
const mockFetchUserData = vi.fn();
const mockState = {
  focused: false,
  onEnterReleaseCallback: null as (() => void) | null,
};

vi.mock("@/queries/api/user.api", () => ({
  fetchUserData: () => mockFetchUserData(),
}));

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
    mockFetchUserData.mockClear();
    mockState.focused = false;
    mockState.onEnterReleaseCallback = null;
    
    // Default mock response
    mockFetchUserData.mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      plan: "Premium",
      memberSince: "December 2026",
    });
  });

  it("should render user profile information", async () => {
    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("December 2026")).toBeInTheDocument();
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

  it("should render profile avatar", async () => {
    const { container } = render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByLabelText("loading")).not.toBeInTheDocument();
    });

    const avatar = container.querySelector('[class*="avatar"]');
    expect(avatar).toBeInTheDocument();
    expect(avatar?.textContent).toBe("U");
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
