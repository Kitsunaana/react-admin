import { memo } from "react"
import { useLang } from "shared/context/lang"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { Actions } from "../actions"
import { AltName } from "../../domain/types"
import { Layout } from "../layout"

export const Root = memo(({
  altName,
  disabled,
  active,
  state,
  onEdit,
  onRemove,
}: {
  altName: AltName
  disabled: boolean
  active: boolean
  state: string
  onRemove: (data: AltName) => void
  onEdit: (data: AltName) => void
}) => {
  const langBase = useLang("rows")

  const handleRemove = () => onRemove(altName)
  const handleEdit = () => onEdit(altName)

  useKeyboard({
    key: "d",
    disabled: !active,
    callback: altCtrlKey(handleRemove),
  })

  useKeyboard({
    key: "e",
    disabled: !active,
    callback: altCtrlKey(handleEdit),
  })

  return (
    <Layout
      langBase={langBase}
      state={state}
      active={active}
      disabled={disabled}
      caption={(
        <Text caption={altName.caption} />
      )}
      actions={(
        <Actions
          langBase={langBase}
          onEdit={handleEdit}
          onRemove={handleRemove}
          beforeActions={(
            <Mark>{altName.locale.caption}</Mark>
          )}
        />
      )}
    />
  )
})
