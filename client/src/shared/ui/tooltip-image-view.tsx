import { Badge, Tooltip } from "@mui/material"
import { Icon } from "shared/ui/icon"
import React, { memo } from "react"
import { Box } from "shared/ui/box"

interface TooltipImageViewProps {
  images: {
    id: number,
    path: string
  }[]
}

export const TooltipImageView = memo((props: TooltipImageViewProps) => {
  const { images } = props

  return (
    <Tooltip
      placement="top"
      arrow
      title={(
        <Box
          gap
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {images.map((image) => (
            <img
              alt=""
              key={image.id}
              src={`http://localhost:3333/${image.path}`}
              style={{
                width: 110,
                height: 70,
                objectFit: "cover",
              }}
            />
          ))}
        </Box>
      )}
    >
      <Badge
        invisible={images.length < 2}
        badgeContent={images.length}
        color="secondary"
        sx={{
          "& .MuiBadge-badge": {
            px: 0.25,
            top: -1,
            zIndex: 0,
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
