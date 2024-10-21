import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import Dotenv from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "node:path"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import webpack from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { BuildOptions } from "./types/config"

export const buildPlugins = ({ paths, isDev }: BuildOptions) => [
  new SimpleProgressWebpackPlugin({ format: "minimal", color: true }),
  new HtmlWebpackPlugin({ template: path.resolve(paths.html) }),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css",
  }),
  new webpack.ProvidePlugin({ process: "process/browser" }),
  new webpack.DefinePlugin({
    __IS_DEV_: isDev,
    API_URL: JSON.stringify(process.env.API_URL),
  }),
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
  new Dotenv(),
]
