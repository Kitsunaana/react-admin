import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import {BuildPaths} from "./types/config";

export const buildPlugins = (paths: BuildPaths) => {
    return [
        new SimpleProgressWebpackPlugin({format: "expanded"}),
        new HtmlWebpackPlugin({template: path.resolve(paths.html)})
    ]
}