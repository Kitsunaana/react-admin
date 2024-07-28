import { Badge, Tooltip } from "@mui/material"
import { Icon } from "shared/ui/icon"
import React from "react"
import { Box } from "shared/ui/box"

interface TooltipImageViewProps {
  images: string[]
}

export const TooltipImageView = (props: TooltipImageViewProps) => {
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
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
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
          },
        }}
      >
        <div
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
        </div>
      </Badge>
    </Tooltip>
  )
}
