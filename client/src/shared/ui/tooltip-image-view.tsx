import { Badge as MUIBadge, Tooltip } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { memo, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { dispatch } from "shared/lib/event"
import { Common } from "shared/types/common"
import { getImageUrl } from "shared/lib/utils"
import { styled } from "@mui/material/styles"
import { badgeClasses } from "@mui/material/Badge"

interface TooltipImageViewProps {
  images?: Common.Media[]
}

export const Image = styled("img")`
  width: 110px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
`

export const ImageContainer = styled((props: BoxProps & { noOne: boolean }) => {
  const { noOne, ...other } = props
  return <Box {...other} />
})(({ noOne }) => ({
  display: "grid",
  gap: 8,
  gridTemplateColumns: `repeat(${noOne ? 2 : 1}, 1fr)`,
}))

export const Badge = styled(MUIBadge)(({ theme }) => ({
  [`& .${badgeClasses.badge}`]: {
    padding: "0px 4px",
    top: -1,
    zIndex: 0,
    backgroundColor: theme.palette.secondary[theme.palette.mode === "dark" ? "main" : "light"],
    color: theme.palette.mode === "dark" ? "black" : "white",
  },
}))

export const TooltipImageView = memo(({ images }: TooltipImageViewProps) => {
  const [open, setOpen] = useState(false)

  if (!images || images.length === 0) return null

  const newImages = images.length >= 14 ? [...images].splice(0, 14) : images

  return (
    <Tooltip
      arrow
      placement="top"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={(
        <ImageContainer noOne={images.length > 1}>
          {newImages.map((image, index) => (
            <Image
              alt={image.originalName}
              key={image.id}
              src={getImageUrl(image.filename)}
              onClick={() => {
                setOpen(false)
                dispatch("gallery", { images, index })
              }}
            />
          ))}
        </ImageContainer>
      )}
    >
      <Badge
        invisible={images.length < 2}
        badgeContent={images.length}
      >
        <Icon
          color="secondary"
          fontSize="small"
          name="image"
        />
      </Badge>
    </Tooltip>
  )
})
