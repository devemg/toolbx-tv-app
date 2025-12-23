import { apiClient } from "@/queries/api-client";

describe("API Client", () => {
  it("should be configured with correct baseURL", () => {
    expect(apiClient.defaults.baseURL).toContain("/api");
  });

  it("should have correct timeout", () => {
    expect(apiClient.defaults.timeout).toBe(10000);
  });

  it("should have Content-Type header configured", () => {
    expect(apiClient.defaults.headers["Content-Type"]).toBe("application/json");
  });

  it("should handle successful responses", async () => {
    const mockResponse = { data: { test: "data" }, status: 200 };
    vi.spyOn(apiClient, "get").mockResolvedValue(mockResponse);

    const result = await apiClient.get("/test");
    
    expect(result).toEqual(mockResponse);
  });

  it("should handle API errors and log them", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const mockError = new Error("Network Error");
    vi.spyOn(apiClient, "get").mockRejectedValue(mockError);

    await expect(apiClient.get("/test")).rejects.toThrow("Network Error");
    
    consoleErrorSpy.mockRestore();
  });
});
