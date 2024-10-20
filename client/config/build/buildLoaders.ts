import webpack from "webpack"
import { BuildOptions } from "./types/config"

export const buildLoaders = ({ isDev }: BuildOptions): webpack.RuleSetRule[] => {
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  }

  const babelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [isDev && "react-refresh/babel"].filter(Boolean),
      },
    },
  }

  const cssLoader = {
    // test: /\.s[ac]ss$/i,
    // use: [
    //   isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    //   {
    //     loader: "css-loader",
    //     options: {
    //       modules: {
    //         auto: (resPath: string) => Boolean(resPath.includes(".module.")),
    //         localIdentName: isDev
    //           ? "[path][name]__[local]--[hash:base64:5]"
    //           : "[hash:base64:8]",
    //       },
    //     },
    //   },
    //   "sass-loader",
    // ],
    test: /\.css$/, // Обработка CSS файлов
    use: ["style-loader", "css-loader"],
  }

  const typescriptLoader: webpack.RuleSetRule = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  }

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  }

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    typescriptLoader,
    cssLoader,
  ]
}
