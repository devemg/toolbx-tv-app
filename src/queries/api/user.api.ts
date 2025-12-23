import type { User } from "@/models/user";
import { apiClient } from "../api-client";


export const fetchUserData = async (): Promise<User> => {
    const response = await apiClient.get<User>(`/user`);
    return response.data;
};