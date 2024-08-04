import * as React from "react"
import {
  memo, useCallback, useEffect, useRef, useState,
} from "react"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { useFormContext } from "react-hook-form"
import {
  InputProps,
} from "@mui/material"
import { Image } from "features/categories/create-and-edit/ui/image"
import { ReactSortable } from "react-sortablejs"

const uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, () => {
  const random = (Math.random() * 16) | 0
  return random.toString(16)
})

export interface IFile {
  caption: string,
  data: File,
  type: string,
  id: string,
  deleted?: boolean
  index?: number
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

export const PhotosTab = memo((props: PhotosTabProps) => {
  const { fullScreen } = props

  const { setValue, watch } = useFormContext()

  const watchImages = watch("images")

  const [state, setState] = useState<any[]>(watchImages ?? [])

  useEffect(() => {
    setState(watchImages)
  }, [watchImages])

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
      <ReactSortable
        onChange={(event) => {
          const imageIds = Array.prototype.map.call(event.target.children, (element) => element.id)

          const newState = state.map((image) => {
            image.index = imageIds.findIndex((id) => id === image.id)
            return image
          })

          setValue("images", newState)
        }}
        filter=".addImageButtonContainer"
        dragClass="sortableDrag"
        animation={200}
        easing="ease-out"
        list={state}
        setList={setState}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          overflowY: "scroll",
          height: fullScreen ? undefined : 380,
        }}
      >
        {state && state.map((item) => (
          <Image
            className="draggableItem"
            key={item.id}
            id={item.id}
            name={item.caption}
            file={item.data}
          />
        ))}
      </ReactSortable>
    </>
  )

  // const [list, setList] = useState<any[]>(draggableList)

  /* return (
    <ReactSortable
      filter=".addImageButtonContainer"
      dragClass="sortableDrag"
      list={list}
      setList={setList}
      animation={200}
      easing="ease-out"
    >
      {list.map((item) => (
        <div className="draggableItem">{item.name}</div>
      ))}
    </ReactSortable>
  ) */
})
