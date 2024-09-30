import { observer } from "mobx-react-lite"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Vertical } from "shared/ui/divider"
import { RowItem } from "shared/ui/row-item"
import { ICharacteristic } from "entities/characteristic/model/types"
import { Caption } from "entities/characteristic/ui/caption"
import { HiddenIndicator } from "entities/characteristic/ui/hidden-indicator"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { LangContext, useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"
import { useStores } from "features/categories/model/context"

export interface CharacteristicItemProps extends ICharacteristic {
  local?: boolean
}

export const Characteristic = observer((props: CharacteristicItemProps) => {
  const {
    unit, hideClient, value, caption, id, local,
  } = props

  const { characteristics } = useStores()
  const { openDialog } = useEditDialogStore()
  const { openDialog: openDeleteDialog } = useDeleteDialogStore()
  const langBase = useLang()

  const onOpenEditDialog = () => openDialog(id, {
    unit, hideClient, value, caption, id,
  })

  const onOpenDeleteDialog = () => openDeleteDialog(id, { caption })

  const hasConflict = characteristics.getConflict({ id, caption })

  return (
    <LangContext lang={`${langBase}.rows`}>
      <RowItem
        onDoubleClick={onOpenEditDialog}
        bgColor={hasConflict ? "error" : undefined}
        color={hasConflict ? "error" : local ? "warning" : undefined}
      >
        <Box flex row ai>
          <HiddenIndicator hidden={hideClient} />
          <Caption caption={caption} unit={unit} value={value} />
        </Box>
        <Box flex ai row>
          <Icon
            name="allowCategory"
            fontSize="small"
            color="success"
            help={{ title: <Text onlyText name="forCategory" />, arrow: true }}
          />
          <Vertical />
          <IconButtonEdit onClick={onOpenEditDialog} />
          <IconButtonDelete onClick={onOpenDeleteDialog} />
        </Box>
      </RowItem>
    </LangContext>
  )
})
