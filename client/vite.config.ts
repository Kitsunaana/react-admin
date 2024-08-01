import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    // svgr({ exportAsDefault: true }),
    react(),
  ],
  resolve: {
    alias: [
      { find: "shared", replacement: "/src/shared" },
      { find: "entities", replacement: "/src/entities" },
      { find: "features", replacement: "/src/features" },
      { find: "widgets", replacement: "/src/widgets" },
      { find: "pages", replacement: "/src/pages" },
      { find: "app", replacement: "/src/app" },
    ],
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify("http://localhost:8000"),
    __PROJECT__: JSON.stringify("frontend"),
  },
})
