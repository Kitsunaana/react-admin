import { memo } from "react"
import { LangContext, useLang } from "shared/context/lang"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { AltName } from "shared/types/new_types/types"
import { Box } from "shared/ui/box"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { Vertical } from "shared/ui/divider"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { StyledAltNameItem } from "./components"

interface RootProps {
  altName: AltName
  action?: "create" | "update" | "remove"
  disabled?: boolean
  onRemove: (data: AltName) => void
  onEdit: (data: AltName) => void
  active: boolean
}

export const Root = memo((props: RootProps) => {
  const {
    altName,
    action,
    disabled,
    active,
    onEdit,
    onRemove,
  } = props

  const langBase = useLang()

  useKeyboard({
    key: "d",
    disabled: !active,
    callback: ({ altKey, ctrlKey }) => {
      if (altKey && ctrlKey) onRemove(altName)
    },
  })

  useKeyboard({
    key: "e",
    disabled: !active,
    callback: ({ altKey, ctrlKey }) => {
      if (altKey && ctrlKey) {
        onEdit(altName)
      }
    },
  })

  return (
    <LangContext lang={`${langBase}.rows`}>
      <StyledAltNameItem
        active={active}
        disabled={Boolean(disabled)}
        color={["update", "create"].includes(action ?? "") ?? "success"}
      >
        <Text caption={altName.caption} />
        <Box flex row ai sx={{ height: 1 }}>
          <Mark>{altName.locale.caption}</Mark>
          <Vertical />
          <IconButtonEdit onClick={() => onEdit(altName)} />
          <IconButtonDelete onClick={() => onRemove(altName)} />
        </Box>
      </StyledAltNameItem>
    </LangContext>
  )
})
