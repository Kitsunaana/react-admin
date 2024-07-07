import webpack from "webpack";

export const buildLoaders = (): webpack.RuleSetRule[] => {
    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    }

    const typescriptLoader: webpack.RuleSetRule =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "file-loader"
            }
        ]
    }

    return [
        fileLoader,
        svgLoader,
        typescriptLoader
    ]
}