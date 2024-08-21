import { useLang } from "shared/context/Lang"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { addEvent } from "shared/lib/event"
import MUIDialog from "@mui/material/Dialog"
import { Box } from "shared/ui/box"
import MUIDialogContent from "@mui/material/DialogContent"
import MUIDialogActions from "@mui/material/DialogActions"
import * as React from "react"
import { DialogHeader } from "shared/ui/dialog/dialog-header"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { Button } from "@mui/material"
import { Text } from "shared/ui/text"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { observer } from "mobx-react-lite"
import { useDeleteDialogStore } from "shared/ui/dialog/model/dialog-context"

interface DialogProps {
  langBase?: string
  onDeleteOptions?: (id: number | null) => UseMutationOptions<any, any, number | null>
  onDeleteLocal?: (id: number) => void
}

/* interface OpenDialogProps {
  id: number
  caption: string
} */

export const DialogDelete = observer((props: DialogProps) => {
  const {
    langBase: langBaseProps, onDeleteOptions, onDeleteLocal,
  } = props

  const store = useDeleteDialogStore()

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const { t } = useTranslation("translation", { keyPrefix: langBase })

  /* useEffect(() => addEvent(`${langBase}.dialog.delete` as any, (data: OpenDialogProps) => {
    store.openDialog(data.id, { caption: data.caption })
  }), [langBase]) */

  let onDelete
  if (onDeleteOptions) {
    const { mutate } = useMutation(onDeleteOptions(store.id as number))
    onDelete = mutate
  }

  const onSubmit = () => {
    if (onDeleteLocal && store.id) onDeleteLocal(store.id as number)
    if (onDelete && store.id) onDelete(store.id)

    store.closeDialog()
  }

  return (
    <MUIDialog
      fullScreen={store.fullScreen}
      open={store.open}
      PaperProps={{
        sx: {
          borderRadius: 4,
          ...(store.fullScreen ? {} : {
            maxWidth: 445,
            width: 1,
          }),
        },
      }}
    >
      <Box sx={{ mx: 1 }}>
        <DialogHeader
          hideActions
          title={t("dialog.title.delete")}
        />
      </Box>
      <MUIDialogContent sx={{ height: 1, p: 1, mb: 2 }}>
        {store.localData?.caption}
      </MUIDialogContent>
      <MUIDialogActions>
        <Button
          sx={{ borderRadius: 2 }}
          variant="outlined"
          color="warning"
          onClick={onSubmit}
        >
          <Text langBase="global.dialog" name="delete" />
        </Button>
        <CancelButton
          onClick={() => {
            store.closeDialog()
          }}
        />
      </MUIDialogActions>
    </MUIDialog>
  )
})
