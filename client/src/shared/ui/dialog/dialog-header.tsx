import { alpha } from "@mui/material"
import { styled } from "@mui/material/styles"
import { observer } from "mobx-react-lite"
import { Fragment, ReactNode } from "react"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { useModalStore } from "shared/hooks/use-modal-store"

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

export const DialogHeaderCaption = ({
  name,
  value: caption,
}: {
  name: string
  value?: string
}) => (
  <Text
    name={`title.${name}`}
    value={caption}
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

export const ModalHeader = observer(({
  title,
  right,
  left,
}: {
  title: string | ReactNode
  right?: {
    separator?: boolean,
    components: ReactNode[]
  }
  left?: {
    separator?: boolean
    components: ReactNode[]
  }
}) => {
  const modalStore = useModalStore()

  const fullscreenState = modalStore.fullscreen
    ? "fullscreenClose"
    : "fullscreenOpen"

  useKeyboard({
    key: "f",
    callback: ({ ctrlKey, altKey }) => {
      if (ctrlKey && altKey) modalStore.onToggleFullscreen()
    },
  })

  return (
    <HeaderContainer>
      {left?.components?.map((component, index) => {
        if (left?.separator && index === 0) return component

        if (left?.separator) {
          return (
            <Fragment key={index}>
              <Vertical disableMargin />
              {component}
            </Fragment>
          )
        }

        return component
      })}
      {title}
      <Box flex row ai sx={{ mr: 0 }}>
        {right?.components?.map((component, index) => {
          if (right?.separator && index === 0) return component

          if (right?.separator) {
            return (
              <Fragment key={index}>
                <Vertical disableMargin />
                {component}
              </Fragment>
            )
          }

          return component
        })}
        <Vertical disableMargin />
        <IconButton
          onClick={modalStore.onToggleFullscreen}
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
