import webpack from "webpack"

export const buildResolvers = (): webpack.ResolveOptions => ({
  extensions: [".tsx", ".ts", ".js"],
})
