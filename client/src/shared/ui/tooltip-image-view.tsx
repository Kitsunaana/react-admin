import { Badge as MUIBadge, Tooltip } from "@mui/material"
import { badgeClasses } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { memo, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Icon } from "shared/ui/icon"

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

type Media = {
  id: string
  originalName: string
  path: string
}

export const TooltipImageView = memo(({
  media,
  onOpenGallery,
}: {
  media?: Media[]
  onOpenGallery: (index: number) => void
}) => {
  const [open, setOpen] = useState(false)

  if (!media || media.length === 0) return null

  const newImages = media.length >= 14 ? [...media].splice(0, 14) : media

  return (
    <Tooltip
      arrow
      placement="top"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={(
        <ImageContainer noOne={media.length > 1}>
          {newImages.map((image, index) => (
            <Image
              alt={image.originalName}
              key={image.id}
              src={image.path}
              onClick={() => {
                setOpen(false)
                onOpenGallery(index)
              }}
            />
          ))}
        </ImageContainer>
      )}
    >
      <Badge
        invisible={media.length < 2}
        badgeContent={media.length}
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
