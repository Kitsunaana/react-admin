import { useImage } from "shared/hooks/use-image"
import { Image as ImageBase } from "shared/ui/image"

interface CustomImageProps {
  path?: string
  data?: File
  caption: string
}

export const Image = (props: CustomImageProps) => {
  const { path, caption, data } = props

  const src = useImage(path ?? data)

  return (
    <ImageBase
      style={{
        width: "100%",
        height: "250px",
        objectFit: "cover",
        borderRadius: 8,
      }}
      src={src}
      alt={caption}
    />
  )
}
