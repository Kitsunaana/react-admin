import { useEffect, useState } from "react"
import { Box } from "shared/ui/box"
import { alpha } from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/icon-button"
import * as React from "react"
import { IFile } from "features/categories/create/ui/dialog-content"
import { useFormContext } from "react-hook-form"

interface ImageProps {
  src?: string
  url?: string
  name?: string
  local?: string
  id: string
  file: File
}

export const Image = (props: ImageProps) => {
  const {
    url, name, local, src: srcProps, file, id,
  } = props

  const { getValues, setValue } = useFormContext()

  const [src, setSrc] = useState(srcProps)
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
      sx={{
        position: "relative",
      }}
    >
      <Box
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
        }}
      >
        <Text caption={name} />
        <IconButton
          name="clear"
          onClick={() => {
            const images = getValues("images").filter((image: IFile) => image.id !== id)

            setValue("images", images)
          }}
        />
      </Box>
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "170px",
        }}
      />
    </Box>
  )
}
