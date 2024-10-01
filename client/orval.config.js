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

  media: {
    input: "../contracts/media.yaml",
    output: {
      schemas: "./src/shared/types/common/objects",
      mode: "single",
      prettier: true,
    },
  },

  altName: {
    input: "../contracts/alt-name.yaml",
    output: {
      target: "./src/shared/types/common/schemas.ts",
      schemas: "./src/shared/types/common/objects",
      client: "zod",
      mode: "single",
      prettier: true,
    },
  },

  characteristics: {
    input: "../contracts/characteristic.yaml",
    output: {
      target: "./src/shared/types/common/schemas.ts",
      schemas: "./src/shared/types/common/objects",
      client: "zod",
      mode: "single",
      prettier: true,
    },
  },
})
