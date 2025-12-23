import type { IContentListResponse } from "@/models/content";
import { apiClient } from "../api-client";

export const getContentList = async (
  tab: string,
  page: number = 1,
  limit: number = 2
): Promise<IContentListResponse> => {
  try {
    const response = await apiClient.get<IContentListResponse>(
      `/content/${tab}`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching content list:", error);
    throw error;
  }
};
