import { useImage } from "shared/hooks/use-image"
import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
  caption: string
  path?: string
  file?: File
}

export const Image = (props: ImageProps) => {
  const {
    caption, path, file, ...other
  } = props

  const src = useImage(path ?? file)

  return (
    <img
      {...other}
      src={src}
      alt={caption}
      style={{
        display: "block",
        height: 80,
        width: "100%",
        borderRadius: 1,
        objectFit: "cover",
      }}
    />
  )
}
