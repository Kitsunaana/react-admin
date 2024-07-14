import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "node:path"
import webpack from "webpack"
import { BuildPaths } from "./types/config"
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildPlugins = (paths: BuildPaths) => [
  new SimpleProgressWebpackPlugin({ format: "expanded" }),
  new HtmlWebpackPlugin({ template: path.resolve(paths.html) }),
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css"
  })
]
