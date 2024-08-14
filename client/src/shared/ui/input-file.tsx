import { ChangeEvent, memo, useRef } from "react"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import * as React from "react"
import { useTheme } from "@mui/material"
import styled from "styled-components"
import { TImage } from "features/categories/create-and-edit/model/types"
import { nanoid } from "nanoid"

const InputFileContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 35px;
  border-radius: 8px;
  padding: 0px 4px;
  cursor: pointer;
  transition: 0.2s;
  border: ${({ theme }) => `1px solid ${theme.palette.action.disabled}`};
  
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.palette.action.active}`};
  }
`

interface InputFileProps {
  accept: string
  caption: string
  multiple: boolean
  name: string
  disabled?: boolean
  onFilesUpload: (files: TImage[]) => void
}

export const InputFile = memo((props: InputFileProps) => {
  const {
    accept, caption, multiple, name, disabled, onFilesUpload,
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const theme = useTheme()

  const onClick = () => {
    if (inputRef?.current) inputRef.current?.click()
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files: TImage[] = []

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
      theme={theme}
      onClick={onClick}
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
      <Icon name="file" sx={{ mr: 1 }} />
      <Text
        name={name}
        value={caption}
        sx={{ width: 1 }}
      />
    </InputFileContainer>
  )
})
