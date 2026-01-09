import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      // Proxy API requests during dev to avoid CORS issues with the json-server backend
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        // Strip leading /api so requests like /api/events -> /events on the json-server backend
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
