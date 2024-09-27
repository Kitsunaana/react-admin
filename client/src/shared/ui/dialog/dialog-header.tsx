import { alpha } from "@mui/material"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { ReactNode } from "react"
import {
  copyToClipboard,
  readOfClipboard,
} from "shared/lib/utils"
import { useFormContext, UseFormReset } from "react-hook-form"
import { styled } from "@mui/material/styles"
import { Mark } from "shared/ui/mark"
import { Box } from "shared/ui/box"

const HeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundImage: theme.background.hatch.warning,
  backgroundSize: "7px 7px",
  borderRadius: 8,
  padding: 8,
  marginTop: 8,
  marginBottom: 4,
  height: 38,
  border: `1px solid ${alpha(theme.palette.grey["500"], 0.25)}`,
}))

interface DialogHeaderCaptionProps {
  name: string
  value?: string
}

export const DialogHeaderCaption = (props: DialogHeaderCaptionProps) => {
  const { name, value } = props

  return (
    <Text
      name={name}
      value={value}
      sx={{
        textWrap: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginX: "auto",
      }}
      translateOptions={{
        components: {
          strong: <Mark />,
        },
      }}
    />
  )
}

export interface DialogHeaderProps {
  title: string | ReactNode
  showActions?: boolean

  setRows?: (data: any) => void
  setFields?: UseFormReset<any>

  getCopyRows?: () => any
  getCopyFields?: () => any

  settings?: ReactNode
  settingsFields?: Record<string, boolean>
}

export const DialogHeader = observer((props: DialogHeaderProps) => {
  const {
    title,
    settings,
    settingsFields,
    setRows,
    setFields,
    getCopyFields,
    getCopyRows,
    showActions = false,
  } = props

  const methods = useFormContext()
  const store = useEditDialogStore()

  const fullscreenState = store.fullScreen
    ? "fullscreenClose"
    : "fullscreenOpen"

  const handleCopy = async () => {
    const readData = [getCopyRows, getCopyFields ?? methods.getValues]
      ?.filter((fn): fn is () => any => typeof fn === "function")
      .map((fn) => ({ ...fn() }))
      .reduce((prev, current) => ({ ...prev, ...current }), {})

    const { id, ...otherProperties } = readData
    await copyToClipboard({ ...otherProperties, copied: true })
  }

  const handlePaste = async () => {
    let readDataOfClipboard = await readOfClipboard()

    if (settingsFields) {
      const filteredReadData = Object
        .entries(readDataOfClipboard)
        .filter(([key, value]) => {
          if (settingsFields[key] === false) return null
          return [key, value]
        })

      readDataOfClipboard = Object.fromEntries(filteredReadData)
    }

    const setValues = (data: any) => {
      Object.entries(data)
        .forEach(([key, value]) => methods.setValue(key, value))
    }

    [setRows, setFields ?? setValues].forEach((callback) => (
      typeof callback === "function" && callback(readDataOfClipboard)
    ))
  }

  return (
    <HeaderContainer>
      {title}
      <Box flex row ai sx={{ mr: 0 }}>
        {showActions && (
          <>
            <IconButton
              onClick={handleCopy}
              name="copy"
              help={{
                title: (
                  <Text
                    onlyText
                    langBase="global.dialog"
                    name="copy"
                  />
                ),
              }}
            />
            <Vertical disableMargin />
            <IconButton
              onClick={handlePaste}
              name="paste"
              help={{
                title: (
                  <Text
                    onlyText
                    langBase="global.dialog"
                    name="paste"
                  />
                ),
              }}
            />
          </>
        )}
        {settings && <Vertical disableMargin />}
        {settings}
        <Vertical disableMargin />
        <IconButton
          onClick={store.onToggleSizeScreen}
          name={fullscreenState}
          help={{
            title: (
              <Text
                onlyText
                langBase="global.dialog"
                name={fullscreenState}
              />
            ),
          }}
        />
      </Box>
    </HeaderContainer>
  )
})
