import { memo } from "react"
import { LangContext, useLang } from "shared/context/lang"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { AltName } from "shared/types/new_types/types"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { StyledAltNameItem } from "./styles"
import { Actions } from "../actions"

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
    <LangContext lang={langBase}>
      <StyledAltNameItem
        disabled={disabled}
        active={active}
        bgError={state === "error"}
        borderError={state === "error"}
        borderSuccess={state === "success"}
      >
        <Text caption={altName.caption} />

        <Actions
          langBase={langBase}
          onEdit={handleEdit}
          onRemove={handleRemove}
          beforeActions={<Mark>{altName.locale.caption}</Mark>}
        />
      </StyledAltNameItem>
    </LangContext>
  )
})
