import { LangContext, useLang } from "shared/context/lang"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { Tag } from "shared/types/new_types/types"
import { Box } from "shared/ui/box"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { Vertical } from "shared/ui/divider"
import { TagView } from "../tag-view"
import { StyledRowItem } from "./components"

interface LayoutProps {
  tag: Tag
  onRemove: (data: Tag) => void
  onEdit: (data: Tag) => void
  isCreatedOrUpdated: boolean
  active: boolean
}

export const Layout = (props: LayoutProps) => {
  const {
    tag,
    active,
    isCreatedOrUpdated,
    onEdit,
    onRemove,
  } = props

  const langBase = useLang()

  useKeyboard({
    key: "d",
    disabled: !active,
    callback: ({ altKey, ctrlKey }) => {
      if (altKey && ctrlKey) onRemove(tag)
    },
  })

  useKeyboard({
    key: "e",
    disabled: !active,
    callback: ({ altKey, ctrlKey }) => {
      if (altKey && ctrlKey) onEdit(tag)
    },
  })

  return (
    <LangContext lang={`${langBase}.rows`}>
      <StyledRowItem
        active={active}
        isCreatedOrUpdated={isCreatedOrUpdated}
        color={isCreatedOrUpdated && "success"}
      >
        <TagView
          caption={tag.caption}
          color={tag.color}
          icon={tag.icon}
        />
        <Box flex row ai>
          <Vertical />
          <IconButtonEdit onClick={() => onEdit(tag)} />
          <IconButtonDelete onClick={() => onRemove(tag)} />
        </Box>
      </StyledRowItem>
    </LangContext>
  )
}
