import { observer } from "mobx-react-lite"
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
  onRemove: (id: number | string, caption: string) => void
  onEdit: (payload: Common.CharacteristicCreate) => void
  hasConflict: boolean
  isCreatedOrUpdated: boolean
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
  } = props

  const langBase = useLang()

  const handleEdit = () => {
    onEdit({
      caption, value, unit, hideClient, id,
    })
  }

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem
        color={hasConflict ? "error" : (isCreatedOrUpdated && "warning")}
        bgColor={hasConflict && "error"}
        onDoubleClick={handleEdit}
      >
        <Box flex row ai>
          <HiddenIndicator hidden={hideClient} />
          <Caption
            caption={caption}
            unit={unit}
            value={value}
          />
        </Box>
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
            onClick={() => onRemove(id, caption ?? "")}
          />
        </Box>
      </RowItem>
    </LangContext>
  )
})
