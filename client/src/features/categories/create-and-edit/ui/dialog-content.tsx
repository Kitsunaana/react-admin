import * as React from "react"
import {
  ChangeEvent, memo, useEffect, useRef, useState,
} from "react"
import { TabPanel } from "shared/ui/tab-panel"
import { DescriptionInput } from "shared/ui/description"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { useFormContext } from "react-hook-form"
import {
  InputProps,
} from "@mui/material"
import { addEvent } from "shared/lib/event"
import { CaptionInput } from "features/categories/create-and-edit/dialog"
import { Image } from "features/categories/create-and-edit/image"

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

interface DialogContentProps {
  tab: number
}

export const DialogContent = memo((props: DialogContentProps) => {
  const { tab: tabProps } = props

  const [tab, setTab] = useState(tabProps)

  useEffect(() => addEvent("dialog.catalog.changeTab" as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  const {
    setValue, watch,
  } = useFormContext()

  const watchImages = watch("images")

  return (
    <>
      <TabPanel value={tab} index={0}>
        <>
          <CaptionInput sx={{ mb: 1 }} />
          <DescriptionInput />
        </>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <InputFile
          sx={{
            mb: 1,
          }}
          caption=""
          name="images"
          multiple
          clear={false}
          accept="image/*"
          disabled={false}
          onChange={(data) => {
            const setImages = Array.isArray(watchImages)
              ? [...watchImages, ...data]
              : data

            setValue("images", setImages)
          }}
        />

        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
        >
          {watchImages && watchImages.map((img) => (
            <Image
              key={img.id}
              id={img.id}
              name={img.caption}
              file={img.data}
            />
          ))}
        </Box>
      </TabPanel>
    </>
  )
})
