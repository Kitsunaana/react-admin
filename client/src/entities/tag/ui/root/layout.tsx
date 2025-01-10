import { useLang } from "shared/context/lang"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { Tag } from "shared/types/new_types/types"
import { useCallback } from "react"
import { Layout } from "../layout"
import { Actions } from "../actions"
import { TagView } from "../tag-view"

export const Root = ({
  tag,
  active,
  state,
  onEdit,
  onRemove,
}: {
  tag: Tag
  active: boolean
  state: string
  onEdit: (data: Tag) => void
  onRemove: (data: Tag) => void
}) => {
  const langBase = useLang("rows")

  const handleEdit = useCallback(() => onEdit(tag), [tag])
  const handleRemove = useCallback(() => onRemove(tag), [tag])

  useKeyboard({
    key: "e",
    disabled: !active,
    callback: altCtrlKey(handleEdit),
  })

  useKeyboard({
    key: "d",
    disabled: !active,
    callback: altCtrlKey(handleRemove),
  })

  return (
    <Layout
      langBase={langBase}
      state={state}
      active={active}
      infoView={(
        <TagView
          caption={tag.caption}
          color={tag.color}
          icon={tag.icon}
        />
      )}
      actions={(
        <Actions
          langBase={langBase}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      )}
    />
  )
}
