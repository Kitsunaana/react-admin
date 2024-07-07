import webpack from "webpack"
import { BuildOptions } from "./types/config"
import { buildPlugins } from "./buildPlugins"
import { buildLoaders } from "./buildLoaders"
import { buildResolvers } from "./buildResolvers"
import { buildDevServer } from "./buildDevServer"

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(paths),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    devServer: buildDevServer(options),
  }
}
