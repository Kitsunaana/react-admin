import { useEffect, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { alpha, Button } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { IFile } from "features/categories/create-and-edit/ui/tabs/photos"
import { Icon } from "shared/ui/icon"
import { Position } from "shared/ui/position-counter"
import { UseMutationOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { UpdateOrder } from "features/categories/create-and-edit/ui/update-order"
import { Order } from "features/categories/create-and-edit/model/types"

interface ImageProps extends Omit<BoxProps, "id" | "order"> {
  src?: string
  url?: string
  name?: string
  local?: boolean
  id: string | number
  file?: File
  order?: number | null
}

export const Image = (props: ImageProps) => {
  const {
    url, name, local, src: srcProps, file, id, order, ...other
  } = props

  const { getValues, setValue } = useFormContext()

  const [src, setSrc] = useState(srcProps ?? url)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      if (typeof reader.result === "string") setSrc(reader.result)
    }
    reader.readAsDataURL(file)
  }, [file])

  return (
    <Box
      {...other}
      id={String(id)}
      sx={{
        position: "relative",
        height: 170,
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Box
        onClick={(event) => event.stopPropagation()}
        className="wrapper-filename"
        flex
        ai
        jc_sp
        row
        sx={{
          position: "absolute",
          right: 0,
          left: 0,
          p: 1,
          py: 0.5,
          backgroundColor: ({ palette }) => alpha(palette.grey["900"], 0.75),
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          zIndex: 100,
        }}
      >
        <Text
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: 1,
          }}
          caption={name}
        />
        {(typeof order === "number" || order === null) && typeof id === "number" && (
          <UpdateOrder
            order={order}
            id={id}
            onClick={(order, id) => {
              const media = (getValues("media") ?? [])
                .map((media) => (media.id === id ? { ...media, order } : media))

              setValue("media", media)
            }}
          />
        )}
        <IconButton
          sx={{
            p: 0.5,
            minWidth: "unset",
            borderRadius: "50%",
          }}
          sxIcon={{
            fontSize: 20,
          }}
          name="clear"
          onClick={(event) => {
            event.stopPropagation()

            if (local) {
              const images = getValues("images").filter((image: IFile) => image.id !== id)
              setValue("images", images)
            }

            const media = getValues("media") ?? []
            const newMedia = media.map((media) => {
              if (media.id === id) media.deleted = true
              return media
            })
            setValue("media", newMedia)
          }}
        />
      </Box>
      <img
        src={src}
        alt=""
        style={{
          transition: ".2s",
          borderRadius: 8,
          width: "100%",
          height: "170px",
          objectFit: "contain",
        }}
      />
    </Box>
  )
}
