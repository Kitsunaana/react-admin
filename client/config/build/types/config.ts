export interface BuildPaths {
    entry: string
    build: string
    html: string
    src: string
}

export type BuildMode = "development" | "production"

export interface BuildEnv {
    mode: BuildMode
    port: number
    open: boolean
}

export interface BuildOptions {
    paths: BuildPaths
    mode: BuildMode
    isDev: boolean
    port: number
    open: boolean
}
