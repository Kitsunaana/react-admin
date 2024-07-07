export interface BuildPaths {
    entry: string
    build: string
    html: string
}

export type BuildMode = "development" | "production"

export interface BuildOptions {
    paths: BuildPaths
    mode: BuildMode
    isDev: boolean
}