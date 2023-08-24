import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000 * 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          // Define manual chunks here
          // For example:
          myChunk: ["lodash", "axios"],
        },
      },
    },
  },
});
