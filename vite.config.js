import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isTauri = !!process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  build: {
    outDir: "dist",
  },
  server: isTauri
    ? {
        port: 1420,
        strictPort: true,
        host: process.env.TAURI_DEV_HOST,
        hmr: {
          protocol: "ws",
          host: process.env.TAURI_DEV_HOST,
          port: 1421,
        },
        watch: { ignored: ["**/src-tauri/**"] },
      }
    : {},
});
