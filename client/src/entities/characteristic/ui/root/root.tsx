import { memo, useCallback } from "react"
import { useLang } from "shared/context/lang"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { InfoView } from "../info-view"
import { Actions } from "../actions"
import { Layout } from "../layout"
import { Characteristic } from "../../domain/types"

export const Root = memo(({
  data,
  active,
  onEdit,
  onRemove,
  state,
}: {
  data: Characteristic
  onRemove: (payload: Characteristic) => void
  onEdit: (payload: Characteristic) => void
  active: boolean
  state: string
}) => {
  const langBase = useLang("rows")

  const handleRemove = useCallback(() => onRemove(data), [data])
  const handleEdit = useCallback(() => onEdit(data), [data])

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
      state={state}
      active={active}
      langBase={langBase}
      onDoubleClick={handleEdit}
      infoView={(
        <InfoView
          caption={data.caption}
          unit={data.unit}
          value={data.value}
          hideClient={data.hideClient}
        />
      )}
      actions={(
        <Actions
          langBase={langBase}
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      )}
    />
  )
})
