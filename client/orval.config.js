import { defineConfig } from "orval"

export default defineConfig({
  good: {
    input: "./good-api.yaml",
    output: {
      target: "./src/shared/types/good/schemas.ts",
      schemas: "./src/shared/types/good/objects",
      mode: "single",
      client: "zod",
      prettier: true,
    },
  },
})
