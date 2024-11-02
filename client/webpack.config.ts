import path from "node:path"
import webpack from "webpack"
import { BuildEnv, BuildMode, BuildPaths } from "./config/build/types/config"
import { buildWebpackConfig } from "./config/build/build-webpack-config"

export default (env: any): webpack.Configuration => {
  const envOptions: BuildEnv = {
    ...env,
    open: env?.open !== "false",
    port: env?.port ?? 4444,
  }

  console.log(env)

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  }

  const mode: BuildMode = env.mode ?? "development"
  const isDev = mode === "development"

  return buildWebpackConfig({
    paths,
    mode,
    isDev,
    port: envOptions.port,
    open: envOptions.open,
  })
}
