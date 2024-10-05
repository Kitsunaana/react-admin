import { alpha, styled } from "@mui/material"
import { Text } from "shared/ui/text"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { Vertical } from "shared/ui/divider"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { RowItem, RowItemProps } from "shared/ui/row-item"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/lang"
import { AltName } from "../model/types"

const StyledAltNameItem = styled((props: RowItemProps & { disabled: boolean }) => {
  const { disabled, ...other } = props
  return <RowItem {...other} />
})(({ theme, disabled }) => ({
  ...(disabled ? {
    position: "relative",
    "&::after": {
      position: "absolute",
      content: "''",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      borderRadius: 2,
      background: alpha(theme.palette.common[
        theme.palette.mode === "light" ? "black" : "white"
      ], 0.15),
    },
  } : {}),
}))

interface AltNameItemProps extends AltName {
  disabled?: boolean
  onRemove: (id: (string | number), caption: string) => Promise<void>
}

export const AltNameItem = (props: AltNameItemProps) => {
  const {
    id,
    description,
    caption,
    locale,
    action,
    disabled,
    onRemove,
  } = props

  const editStore = useEditDialogStore()
  const langBase = useLang()

  const onOpenEditDialog = () => {
    editStore.openDialog(id, {
      caption, locale, description, id,
    })
  }

  const onOpenDeleteDialog = async () => {
    await onRemove(id, caption)
  }

  return (
    <LangContext lang={`${langBase}.rows`}>
      <StyledAltNameItem
        disabled={Boolean(disabled)}
        color={["update", "create"].includes(action ?? "") ? "success" : undefined}
      >
        <Text caption={caption} />
        <Box flex row ai sx={{ height: 1 }}>
          <Mark>{locale.caption}</Mark>
          <Vertical />
          <IconButtonEdit onClick={onOpenEditDialog} />
          <IconButtonDelete onClick={onOpenDeleteDialog} />
        </Box>
      </StyledAltNameItem>
    </LangContext>
  )
}
