import { styled } from "@mui/material/styles"
import { nanoid } from "nanoid"
import { ChangeEvent, memo, useRef } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { Image } from "shared/types/new_types/types"

const InputFileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 35,
  borderRadius: 8,
  padding: "0px 4px",
  cursor: "pointer",
  transition: "0.2s",
  border: `1px solid ${theme.palette.action.disabled}`,

  "&:hover": {
    border: `1px solid ${theme.palette.action.active}`,
  },
}))

interface InputFileProps extends BoxProps {
  accept: string
  multiple: boolean
  disabled?: boolean
  onFilesUpload: (files: Image[]) => void
}

export const InputFile = memo((props: InputFileProps) => {
  const {
    accept,
    multiple,
    disabled,
    onFilesUpload,
    ...other
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  const onClick = () => {
    if (inputRef?.current) inputRef.current?.click()
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files: Image[] = []

    Array.prototype.forEach.call(event.target.files, (file: File) => {
      if (multiple) {
        files.push({
          caption: file.name,
          data: file,
          type: file.type,
          id: nanoid(),
        })
      }
    })

    if (multiple) onFilesUpload(files)
  }

  return (
    <InputFileContainer
      onClick={onClick}
      {...other}
    >
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={inputRef}
        multiple={multiple}
        onChange={handleFileUpload}
        disabled={disabled}
      />
      <Icon
        name="file"
        sx={{ mr: 1 }}
      />
      <Text
        name={`forms.${multiple ? "images" : "image"}`}
        sx={{ width: 1 }}
      />
    </InputFileContainer>
  )
})
