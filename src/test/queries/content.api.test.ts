import { getContentList } from "@/queries/content.api";
import {
  mockContentLists,
  mockMoviesContentLists,
  mockSeriesContentLists,
  mockKidsContentLists,
} from "../data.mock";

describe("Content API", () => {
  describe("getContentList", () => {
    it("should return movies content list when tab is 'movies'", async () => {
      const result = await getContentList("movies");
      expect(result).toEqual(mockMoviesContentLists);
    });

    it("should return movies content list when tab is 'MOVIES' (case insensitive)", async () => {
      const result = await getContentList("MOVIES");
      expect(result).toEqual(mockMoviesContentLists);
    });

    it("should return series content list when tab is 'series'", async () => {
      const result = await getContentList("series");
      expect(result).toEqual(mockSeriesContentLists);
    });

    it("should return kids content list when tab is 'kids'", async () => {
      const result = await getContentList("kids");
      expect(result).toEqual(mockKidsContentLists);
    });

    it("should return default content list when tab is 'home'", async () => {
      const result = await getContentList("home");
      expect(result).toEqual(mockContentLists);
    });

    it("should return default content list for unknown tab", async () => {
      const result = await getContentList("unknown");
      expect(result).toEqual(mockContentLists);
    });

    it("should return default content list for empty string", async () => {
      const result = await getContentList("");
      expect(result).toEqual(mockContentLists);
    });
  });
});
