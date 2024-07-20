import { Tooltip } from "@mui/material"
import { Icon } from "shared/ui/Icon"
import React from "react"

export const TooltipImageView = () => {
  const src = "https://cultmir.ru/wp-content/uploads/miku-beskonechnoe-leto-dumer-1.webp"

  return (
    <Tooltip
      arrow
      title={(
        <img
          src={src}
          style={{
            width: 100,
            objectFit: "contain",
          }}
        />
      )}
    >
      <div onClick={(event) => event.stopPropagation()} style={{ display: "flex", alignItems: "center" }}>
        <Icon
          sx={{
            fontSize: 20,
            color: ({ palette }) => palette.secondary.main,
          }}
          name="image"
        />
      </div>
    </Tooltip>
  )
}
