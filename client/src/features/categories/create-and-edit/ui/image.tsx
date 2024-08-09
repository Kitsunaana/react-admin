import { useEffect, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { alpha, Button } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import * as React from "react"
import { useFormContext } from "react-hook-form"
import { IFile } from "features/categories/create-and-edit/ui/tabs/photos"
import { Icon } from "shared/ui/icon"

interface ImageProps extends BoxProps {
  src?: string
  url?: string
  name?: string
  local?: boolean
  id: string
  file?: File
}

export const Image = (props: ImageProps) => {
  const {
    url, name, local, src: srcProps, file, id, ...other
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
      id={id}
      sx={{
        position: "relative",
        height: 170,
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Box
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
        <Text sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} caption={name} />
        <IconButton
          sx={{
            p: 0.5,
            minWidth: "unset",
            borderRadius: "50%",
          }}
          sxIcon={{
            fontSize: 20,
          }}
          name="delete"
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
        onLoad={() => {
          console.log(1)
        }}
        src={src}
        alt=""
        style={{
          transition: ".2s",
          borderRadius: 8,
          width: "100%",
          height: "170px",
          objectFit: "cover",
        }}
      />
    </Box>
  )
}
