const mockApiGet = vi.fn();

vi.mock("@/queries/api-client", () => ({
  apiClient: {
    get: (...args: any[]) => mockApiGet(...args),
  },
}));

import { fetchUserData } from "@/queries/api/user.api";

const mockUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  plan: "Premium",
  memberSince: "January 2025",
  avatar: "T",
};

describe("User API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockApiGet.mockResolvedValue({ data: mockUser });
  });

  describe("fetchUserData", () => {
    it("should fetch and return user data", async () => {
      mockApiGet.mockResolvedValue({ data: mockUser });
      
      const result = await fetchUserData();
      
      expect(result).toEqual(mockUser);
      expect(mockApiGet).toHaveBeenCalledWith("/user");
    });

    it("should throw error when request fails", async () => {
      const error = new Error("Network error");
      mockApiGet.mockRejectedValue(error);
      
      await expect(fetchUserData()).rejects.toThrow("Network error");
    });
  });
});
