import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import {BuildOptions} from "./types/config";

export const buildDevServer = ({port, open}: BuildOptions): DevServerConfiguration => {
    return {
        port,
        open,
        historyApiFallback: true,
        hot: true
    }
}