import * as React from "react"
import {
  memo, useRef,
} from "react"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { useFormContext } from "react-hook-form"
import {
  InputProps, useMediaQuery, useTheme,
} from "@mui/material"
import { Image } from "features/categories/create-and-edit/ui/image"
import { dispatch } from "shared/lib/event"

const uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, () => {
  const random = (Math.random() * 16) | 0
  return random.toString(16)
})

export interface IFile {
  caption: string,
  data: File,
  type: string,
  id: string,
  order?: number
}

interface InputFileProps extends Omit<InputProps, "onChange"> {
  accept: string
  caption: string
  multiple: boolean
  value?: {
    value: IFile[],
    tab?: number
  },
  name: string
  clear: boolean
  disabled: boolean
  onChange: (data: IFile[]) => void
}

const InputFile = (props: InputFileProps) => {
  const {
    accept, caption, clear, multiple, value, name, onChange, sx, ...other
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Box
      flex
      row
      ai
      jc="space-between"
      sx={{
        minHeight: 40,
        borderRadius: 1,
        px: 0.5,
        cursor: "pointer",
        border: ({ palette }) => `1px solid ${palette.action.disabled}`,
        "&:hover": {
          border: ({ palette }) => `1px solid ${palette.action.active}`,
        },
        transition: "all 200ms linear",
        ...sx,
      }}
      onClick={() => {
        if (inputRef) inputRef.current?.click()
      }}
    >
      <input
        type="file"
        accept={accept}
        style={{ opacity: 0, display: "none" }}
        ref={inputRef}
        multiple={multiple}
        onChange={(event) => {
          const newData = value?.value ?? []

          Array.prototype.forEach.call(event.target.files, (file: File) => {
            if (multiple) {
              newData.push({
                caption: file.name,
                data: file,
                type: file.type,
                id: uuid(),
              })
            }
          })

          if (multiple) onChange(newData)
        }}
      />
      <Icon
        name="file"
        sx={{ mr: 1 }}
      />
      <Text
        name={name}
        value={caption}
        sx={{ width: 1 }}
      />
    </Box>
  )
}

interface PhotosTabProps {
  fullScreen: boolean
}

export const useGetCountColumns = (fullScreen: boolean) => {
  const { breakpoints } = useTheme()
  const matchesXl = useMediaQuery(breakpoints.up("xl")) && fullScreen
  const matchesLg = useMediaQuery(breakpoints.up("lg")) && fullScreen
  const matchesMd = useMediaQuery(breakpoints.up("md")) && fullScreen

  return matchesXl ? 6 : matchesLg ? 5 : matchesMd ? 4 : 3
}

export const PhotosTab = memo((props: PhotosTabProps) => {
  const { fullScreen } = props

  const countColumns = useGetCountColumns(fullScreen)
  const { setValue, watch } = useFormContext()

  const watchImages = watch("images")
  const watchMedia = watch("media")

  const onOpenGallery = (id: number) => {
    const filteredMedia = watchMedia?.filter((media) => !media.deleted)
    const mergedImages = [...(filteredMedia ?? []), ...(watchImages ?? [])]

    const findIndex = mergedImages.findIndex((media) => media.id === id)
    dispatch("gallery", { images: mergedImages, index: findIndex })
  }

  return (
    <>
      <InputFile
        sx={{
          mb: 1,
        }}
        caption=""
        name="images"
        multiple
        clear={false}
        accept="image/!*"
        disabled={false}
        onChange={(data) => {
          const setImages = Array.isArray(watchImages)
            ? [...watchImages, ...data]
            : data

          setValue("images", setImages)
        }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${countColumns}, 1fr)`,
          gridTemplateRows: "170px",
          gap: 1,
          overflowY: "auto",
          height: fullScreen ? undefined : 380,
        }}
      >
        {watchMedia && watchMedia.filter((media) => !media.deleted).map((item) => (
          <Image
            onClick={() => onOpenGallery(item.id)}
            url={`http://localhost:3333/${item.path}`}
            className="draggableItem"
            key={item.id}
            id={item.id}
            name={item.originalName}
          />
        ))}
        {watchImages && watchImages.map((item) => (
          <Image
            local
            onClick={() => onOpenGallery(item.id)}
            className="draggableItem"
            key={item.id}
            id={item.id}
            name={item.caption}
            file={item.data}
          />
        ))}
      </Box>
    </>
  )
})
