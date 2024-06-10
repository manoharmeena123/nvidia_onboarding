import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/', // Update this to your base URL if needed
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
      "@assets": path.resolve(__dirname, "src/assets/"), // Alias for assets
      "@zustand-store": path.resolve(__dirname, "src/zustand-store"), // Alias for assets
      "@pages": path.resolve(__dirname, "src/pages"), // Alias for pages
      "@components": path.resolve(__dirname, "src/components"), // Alias for components
      "@utils": path.resolve(__dirname, "src/utils"), // Alias for utils
      "@services": path.resolve(__dirname, "src/services"), // Alias for service
      "@lib": path.resolve(__dirname, "src/lib/theme"), // Alias for theme
    },
  },

  optimizeDeps: {
    // include: ["@emotion/react", "@emotion/styled",'@mui/icons-material'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Optional: Add node.js polyfills as necessary
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
});
