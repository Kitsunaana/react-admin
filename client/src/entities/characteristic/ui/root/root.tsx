import { memo, useCallback } from "react"
import { LangContext, useLang } from "shared/context/lang"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { Characteristic } from "shared/types/new_types/types"
import { StyledRowItem } from "./styles"
import { InfoView } from "../info-view"
import { Actions } from "../actions"

export const Root = memo(({
  data,
  active,
  hasConflict,
  isCreatedOrUpdated,
  onEdit,
  onRemove,
}: {
  data: Characteristic
  hasConflict: boolean
  isCreatedOrUpdated: boolean
  onRemove: (payload: Characteristic) => void
  onEdit: (payload: Characteristic) => void
  active?: boolean
}) => {
  const langBase = useLang("rows")

  const handleRemove = useCallback(() => onRemove(data), [data])
  const handleEdit = useCallback(() => onEdit(data), [data])

  useKeyboard({
    key: "d",
    disabled: !active,
    callback: altCtrlKey(() => onRemove(data)),
  })

  useKeyboard({
    key: "e",
    disabled: !active,
    callback: altCtrlKey(() => onEdit(data)),
  })

  return (
    <LangContext lang={langBase}>
      <StyledRowItem
        borderSuccess={isCreatedOrUpdated}
        borderError={hasConflict}
        bgError={hasConflict}
        onDoubleClick={handleEdit}
        active={Boolean(active)}
      >
        <InfoView
          caption={data.caption}
          unit={data.unit}
          value={data.value}
          hideClient={data.hideClient}
        />

        <Actions
          langBase={langBase}
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      </StyledRowItem>
    </LangContext>
  )
})