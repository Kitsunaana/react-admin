import webpack from "webpack"
import { BuildOptions } from "./types/config"
import { buildPlugins } from "./build-plugins"
import { buildLoaders } from "./build-loaders"
import { buildResolvers } from "./build-resolvers"
import { buildDevServer } from "./build-dev-server"

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      publicPath: "/",
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: buildDevServer(options),
  }
}
