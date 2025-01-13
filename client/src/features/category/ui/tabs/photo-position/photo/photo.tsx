import { useImage } from "shared/hooks/use-image"
import { StyledPhoto } from "./styles"

export const Photo = ({
  caption,
  data,
}: {
  caption: string
  data: string | File
}) => (
  <StyledPhoto
    src={useImage(data)}
    alt={caption}
  />
)
