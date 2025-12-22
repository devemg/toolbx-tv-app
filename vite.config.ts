import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@queries": path.resolve(__dirname, "./src/queries"),
      "@navigation": path.resolve(__dirname, "./src/navigation"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    coverage: {
      enabled: true, // Ensures coverage is enabled
      // List of glob patterns to include in the coverage report
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      exclude: [
        "src/test/**",
        "src/mocks/**",
        "*.mock.{ts,tsx,js,jsx}",
        "src/**/*.d.ts",
        "src/**/index.{ts,tsx,js,jsx}",
        "src/main.tsx",
      ]
    },
  },
});
