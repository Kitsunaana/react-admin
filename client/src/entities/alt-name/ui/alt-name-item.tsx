import { alpha, styled } from "@mui/material"
import { LangContext, useLang } from "shared/context/lang"
import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { Vertical } from "shared/ui/divider"
import { Mark } from "shared/ui/mark"
import { RowItem, RowItemProps } from "shared/ui/row-item"
import { Text } from "shared/ui/text"
import { AltName } from "../domain/types"

const StyledAltNameItem = styled((props: RowItemProps & { disabled: boolean }) => {
  const { disabled, ...other } = props
  return <RowItem {...other} />
})(({ theme: { palette }, disabled }) => ({
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
      background: alpha(palette.common[
        palette.mode === "light" ? "black" : "white"
      ], 0.15),
    },
  } : {}),
}))

interface AltNameItemProps extends AltName {
  disabled?: boolean
  handleRemove: (altName: Common.AltNameCreate) => Promise<void>
  handleEdit: (payload: Common.AltNameCreate) => void
}

export const AltNameItem = (props: AltNameItemProps) => {
  const {
    id,
    description,
    caption,
    locale,
    action,
    disabled,
    handleRemove,
    handleEdit,
  } = props

  const langBase = useLang()

  const onOpenEditDialog = () => {
    handleEdit({
      caption, locale, description, id,
    })
  }

  const onOpenDeleteDialog = async () => {
    await handleRemove({
      caption, locale, description, id,
    })
  }

  return (
    <LangContext lang={`${langBase}.rows`}>
      <StyledAltNameItem
        disabled={Boolean(disabled)}
        color={["update", "create"].includes(action ?? "") ?? "success"}
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
