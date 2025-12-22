import { renderHook } from "@testing-library/react";
import { useFocusableMagic } from "@/navigation/hooks/useFocusableMagic";

const mockUseFocusable = vi.fn();
const mockUseMagicRemote = vi.fn();

vi.mock("@noriginmedia/norigin-spatial-navigation", () => ({
  useFocusable: (config?: any) => mockUseFocusable(config),
}));

vi.mock("@/navigation/hooks/useMagicRemote", () => ({
  useMagicRemote: (ref: any, options: any) => mockUseMagicRemote(ref, options),
}));

describe("useFocusableMagic", () => {
  const mockFocusableReturn = {
    ref: { current: null },
    focused: false,
    focusKey: "test-focus-key",
    focusSelf: vi.fn(),
  };

  beforeEach(() => {
    mockUseFocusable.mockClear();
    mockUseMagicRemote.mockClear();
    mockUseFocusable.mockReturnValue(mockFocusableReturn);
  });

  it("should call useFocusable with provided config", () => {
    const config = {
      focusKey: "custom-key",
      onFocus: vi.fn(),
    };

    renderHook(() => useFocusableMagic(config));

    expect(mockUseFocusable).toHaveBeenCalledWith(config);
  });

  it("should call useFocusable without config when none provided", () => {
    renderHook(() => useFocusableMagic());

    expect(mockUseFocusable).toHaveBeenCalledWith(undefined);
  });

  it("should call useMagicRemote with ref and focusKey from useFocusable", () => {
    renderHook(() => useFocusableMagic());

    expect(mockUseMagicRemote).toHaveBeenCalledWith(
      mockFocusableReturn.ref,
      expect.objectContaining({
        focusKey: "test-focus-key",
      })
    );
  });

  it("should pass onEnter callback to useMagicRemote that calls onEnterRelease", () => {
    const mockOnEnterRelease = vi.fn();
    const config = {
      onEnterRelease: mockOnEnterRelease,
    };

    renderHook(() => useFocusableMagic(config));

    // Get the onEnter callback passed to useMagicRemote
    const magicRemoteOptions = mockUseMagicRemote.mock.calls[0][1];
    
    // Call the onEnter callback
    magicRemoteOptions.onEnter();

    expect(mockOnEnterRelease).toHaveBeenCalledWith({});
  });

  it("should handle undefined onEnterRelease gracefully", () => {
    renderHook(() => useFocusableMagic());

    // Get the onEnter callback passed to useMagicRemote
    const magicRemoteOptions = mockUseMagicRemote.mock.calls[0][1];
    
    // Should not throw when called
    expect(() => magicRemoteOptions.onEnter()).not.toThrow();
  });

  it("should return the result from useFocusable", () => {
    const { result } = renderHook(() => useFocusableMagic());

    expect(result.current).toEqual(mockFocusableReturn);
  });

  it("should work with custom config including onEnterRelease", () => {
    const mockOnEnterRelease = vi.fn();
    const mockOnFocus = vi.fn();
    const config = {
      focusKey: "my-key",
      onFocus: mockOnFocus,
      onEnterRelease: mockOnEnterRelease,
    };

    renderHook(() => useFocusableMagic(config));

    expect(mockUseFocusable).toHaveBeenCalledWith(config);
    expect(mockUseMagicRemote).toHaveBeenCalledWith(
      mockFocusableReturn.ref,
      expect.objectContaining({
        focusKey: "test-focus-key",
        onEnter: expect.any(Function),
      })
    );
  });

  it("should maintain ref consistency between useFocusable and useMagicRemote", () => {
    renderHook(() => useFocusableMagic());

    const focusableRef = mockUseFocusable.mock.results[0].value.ref;
    const magicRemoteRef = mockUseMagicRemote.mock.calls[0][0];

    expect(magicRemoteRef).toBe(focusableRef);
  });

  it("should update when config changes", () => {
    const mockOnEnterRelease1 = vi.fn();
    const mockOnEnterRelease2 = vi.fn();

    const { rerender } = renderHook(
      ({ config }) => useFocusableMagic(config),
      {
        initialProps: {
          config: { onEnterRelease: mockOnEnterRelease1 },
        },
      }
    );

    expect(mockUseFocusable).toHaveBeenCalledTimes(1);

    rerender({ config: { onEnterRelease: mockOnEnterRelease2 } });

    expect(mockUseFocusable).toHaveBeenCalledTimes(2);
  });
});
