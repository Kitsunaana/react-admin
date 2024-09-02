import { Badge, Tooltip } from "@mui/material"
import { Icon } from "shared/ui/icon"
import React, { memo, useState } from "react"
import { Box } from "shared/ui/box"
import { dispatch } from "shared/lib/event"
import { TMedia } from "features/categories/edit/model/types"

interface TooltipImageViewProps {
  images?: TMedia[]
}

export const TooltipImageView = memo((props: TooltipImageViewProps) => {
  const { images } = props

  const [open, setOpen] = useState(false)

  if (!images || images.length === 0) return null
  const newImages = images.length >= 14 ? [...images].splice(0, 14) : images

  return (
    <Tooltip
      placement="top"
      arrow
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={(
        <Box
          gap
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${images.length === 1 ? 1 : 2}, 1fr)`,
          }}
        >
          {newImages.map((image, index) => (
            <img
              alt={image.originalName}
              key={image.id}
              src={`http://localhost:3333/${image.path}`}
              onClick={() => {
                setOpen(false)
                dispatch("gallery", { images, index })
              }}
              style={{
                width: 110,
                height: 70,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ))}
        </Box>
      )}
    >
      <Badge
        invisible={images.length < 2}
        badgeContent={images.length}
        sx={{
          "& .MuiBadge-badge": {
            px: 0.25,
            top: -1,
            zIndex: 0,
            backgroundColor: ({ palette }) => (palette.mode === "dark"
              ? palette.secondary.main
              : palette.secondary.light),
            color: ({ palette }) => (palette.mode === "dark" ? "black" : "white"),
          },
        }}
      >
        <Box
          onClick={(event) => event.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            sx={{
              fontSize: 20,
              color: ({ palette }) => palette.secondary.main,
            }}
            name="image"
          />
        </Box>
      </Badge>
    </Tooltip>
  )
})
