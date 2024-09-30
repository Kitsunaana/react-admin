import { defineConfig } from "orval"

export default defineConfig({
  category: {
    input: "../contracts/category-api.yaml",
    output: {
      target: "./src/shared/types/category/schemas.ts",
      schemas: "./src/shared/types/category/objects",
      mode: "single",
      client: "zod",
      prettier: true,
    },
  },
  common: {
    input: "../contracts/media.yaml",
    output: {
      target: "./src/shared/types/common/schemas.ts",
      schemas: "./src/shared/types/common/objects",
      mode: "single",
      client: "zod",
      prettier: true,
    },
  },
})
