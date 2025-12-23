const mockApiGet = vi.fn();

vi.mock("@/queries/api-client", () => ({
  apiClient: {
    get: (...args: any[]) => mockApiGet(...args),
  },
}));

import { getContentList } from "@/queries/api/content.api";
import {
  mockMoviesContentLists,
} from "../data.mock";

describe("Content API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockApiGet.mockResolvedValue({ data: mockMoviesContentLists });
  });

  describe("getContentList", () => {
    it("should return movies content list when tab is 'movies'", async () => {
      mockApiGet.mockResolvedValue({ data: mockMoviesContentLists });
      const result = await getContentList("movies");
      expect(result).toEqual(mockMoviesContentLists);
      expect(mockApiGet).toHaveBeenCalledWith("/content/movies", {
        params: { page: 1, limit: 2 },
      });
    });
  });
});
