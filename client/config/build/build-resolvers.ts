import webpack from "webpack"
import { BuildOptions } from "./types/config"

export const buildResolvers = ({ paths }: BuildOptions): webpack.ResolveOptions => ({
  extensions: [".tsx", ".ts", ".js"],
  preferAbsolute: true,
  modules: [paths.src, "node_modules"],
  mainFiles: ["index"],
  alias: {},
})
