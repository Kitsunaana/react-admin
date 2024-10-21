import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    define: {
      "process.env": env,
    },
    plugins: [
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
  }
})
