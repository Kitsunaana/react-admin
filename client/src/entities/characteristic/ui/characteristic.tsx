import { observer } from "mobx-react-lite"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Vertical } from "shared/ui/divider"
import { RowItem } from "shared/ui/row-item"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { LangContext, useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"
import { Common } from "shared/types/common"
import { Caption } from "./caption"
import { HiddenIndicator } from "./hidden-indicator"

export interface CharacteristicItemProps extends Common.CharacteristicCreate {
  onRemove: (id: number | string, caption: string) => void
  onEdit: (id: string | number, data: Common.CharacteristicCreate) => void
  getConflict: (data: Pick<Common.CharacteristicCreate, "id" | "caption">) => boolean
  isRecordCreatedOrUpdated: (id: number | string) => boolean
}

export const Characteristic = observer((props: CharacteristicItemProps) => {
  const {
    id,
    caption,
    unit,
    value,
    hideClient,
    onRemove,
    onEdit,
    getConflict,
    isRecordCreatedOrUpdated,
  } = props

  const langBase = useLang()
  const hasConflict = getConflict({ id, caption })

  const handleEdit = () => {
    onEdit(id, {
      caption, value, unit, hideClient, id,
    })
  }

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem
        color={hasConflict ? "error" : (isRecordCreatedOrUpdated(id) && "warning")}
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
            onClick={() => onRemove(id, caption)}
          />
        </Box>
      </RowItem>
    </LangContext>
  )
})
