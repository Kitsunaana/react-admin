import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "node:path"
import webpack from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { BuildOptions } from "./types/config"

export const buildPlugins = ({ paths, isDev }: BuildOptions) => [
  new SimpleProgressWebpackPlugin({ format: "minimal", color: true }),
  new HtmlWebpackPlugin({ template: path.resolve(paths.html) }),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css",
  }),
  new webpack.DefinePlugin({
    __IS_DEV_: isDev,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
]
