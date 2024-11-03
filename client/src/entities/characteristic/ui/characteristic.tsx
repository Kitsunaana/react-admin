import { observer } from "mobx-react-lite"
import { useCallback, useMemo } from "react"
import { LangContext, useLang } from "shared/context/lang"
import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { Vertical } from "shared/ui/divider"
import { Icon } from "shared/ui/icon"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"
import { Caption } from "./caption"
import { HiddenIndicator } from "./hidden-indicator"

export interface CharacteristicItemProps extends Common.CharacteristicCreate {
  onRemove: (payload: Common.CharacteristicCreate) => void
  onEdit: (payload: Common.CharacteristicCreate) => void
  hasConflict: boolean
  isCreatedOrUpdated: boolean
  active?: boolean
}

export const Characteristic = observer((props: CharacteristicItemProps) => {
  const {
    id,
    caption,
    unit,
    value,
    hideClient,
    hasConflict,
    isCreatedOrUpdated,
    onRemove,
    onEdit,
    active = false,
  } = props

  const langBase = useLang()

  const handleEdit = useCallback(() => {
    onEdit({
      caption, value, unit, hideClient, id,
    })
  }, [])

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem
        color={hasConflict ? "error" : (isCreatedOrUpdated && "warning")}
        bgColor={hasConflict && "error"}
        onDoubleClick={handleEdit}
        sx={{
          ...(active ? {
            border: ({ palette }) => (
              `1px solid ${palette.mode === "light" ? palette.primary.light : palette.warning.dark}`
            ),
            ...(isCreatedOrUpdated ? {
              borderLeft: ({ palette }) => (
                `5px solid ${palette.mode === "light" ? palette.primary.light : palette.warning.dark}`
              ),
            } : {}),
          } : {}),
        }}
      >
        {useMemo(() => (
          <Box flex row ai>
            <HiddenIndicator hidden={hideClient} />
            <Caption
              caption={caption}
              unit={unit}
              value={value}
            />
          </Box>
        ), [hideClient, caption, unit, value])}
        {useMemo(() => (
          <Box flex ai row>
            <Icon
              name="allowCategory"
              fontSize="small"
              color="success"
              help={{
                title: (
                  <Text
                    onlyText
                    name="forCategory"
                  />
                ),
              }}
            />
            <Vertical />
            <IconButtonEdit onClick={handleEdit} />
            <IconButtonDelete
              onClick={() => (
                onRemove({
                  hideClient,
                  id,
                  unit,
                  value,
                  caption,
                })
              )}
            />
          </Box>
        ), [hideClient, caption, unit, value])}
      </RowItem>
    </LangContext>
  )
})
