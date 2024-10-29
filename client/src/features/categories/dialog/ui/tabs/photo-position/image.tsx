import { useImage } from "shared/hooks/use-image"
import { Image as ImageBase } from "shared/ui/image"
import styled from "styled-components"

const StyledImage = styled(ImageBase)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8;
`

interface CustomImageProps {
  path?: string
  data?: File
  caption: string
}

export const Image = (props: CustomImageProps) => {
  const { path, caption, data } = props

  const src = useImage(path ?? data)

  return (
    <StyledImage
      src={src}
      alt={caption}
    />
  )
}
