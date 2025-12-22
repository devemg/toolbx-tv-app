import type { IContentListResponse } from "@/models/content";
import {
  mockContentLists,
  mockKidsContentLists,
  mockMoviesContentLists,
  mockSeriesContentLists,
} from "@/test/data.mock";

export const getContentList = async (
  tab: string
): Promise<IContentListResponse> => {
  // Simulate an API call to fetch content by ID
  if (tab.toLowerCase() === "movies") {
    return Promise.resolve(mockMoviesContentLists);
  }
  if (tab.toLowerCase() === "series") {
    return Promise.resolve(mockSeriesContentLists);
  }
  if (tab.toLowerCase() === "kids") {
    return Promise.resolve(mockKidsContentLists);
  }
  return Promise.resolve(mockContentLists);
};
