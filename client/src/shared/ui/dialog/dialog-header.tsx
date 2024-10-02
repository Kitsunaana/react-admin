import { alpha } from "@mui/material"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { ReactNode } from "react"
import { styled } from "@mui/material/styles"
import { Mark } from "shared/ui/mark"
import { Box } from "shared/ui/box"
import { toast } from "react-toastify"
import { DialogStore } from "shared/ui/dialog/model/dialog-store"

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

  settings?: ReactNode

  onCopyClick?: () => Promise<void>
  onPasteClick?: () => Promise<void>
  onClearClick?: () => void
  store: DialogStore

}

export const DialogHeader = observer((props: DialogHeaderProps) => {
  const {
    title,
    settings,
    onCopyClick,
    onPasteClick,
    onClearClick,
    showActions = false,
    store,
  } = props

  const fullscreenState = store.fullScreen
    ? "fullscreenClose"
    : "fullscreenOpen"

  const handleCopy = async () => {
    if (!onCopyClick) return

    await toast.promise(onCopyClick(), {
      success: "Данные для перноса скопированы",
      error: "При копировании данных произошла ошибка",
    })
  }

  const handlePaste = async () => {
    if (!onPasteClick) return

    await toast.promise(onPasteClick(), {
      success: "Данные успешно вставлены",
      error: "Не валидные данные для вставки",
    })
  }

  return (
    <HeaderContainer>
      {onClearClick && (
        <IconButton
          onClick={onClearClick}
          name="delete"
          color="error"
          help={{
            title: (
              <Text
                onlyText
                langBase="global.dialog"
                name="clear"
              />
            ),
          }}
        />
      )}
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
