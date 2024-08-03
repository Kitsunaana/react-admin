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

interface DialogProps {
  langBase?: string
  onDeleteOptions: (id: number) => UseMutationOptions<any, any, number>
}

export const DialogDelete = (props: DialogProps) => {
  const {
    langBase: langBaseProps, onDeleteOptions,
  } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const [data, setData] = useState<{id: number; caption: string}>({ id: 1, caption: "" })
  const [open, setOpen] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const { t } = useTranslation("translation", { keyPrefix: langBase })

  useEffect(() => addEvent(`${langBase}.dialog.delete` as any, (data: { id: number; caption: string }) => {
    setOpen(true)
    setData(data)
  }), [langBase])

  const { mutate } = useMutation(onDeleteOptions(data.id))

  const onSubmit = () => {
    setOpen(false)
    mutate(data.id)
  }

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: 4,
          ...(fullScreen ? {} : {
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
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      </Box>
      <MUIDialogContent sx={{ height: 1, p: 1, mb: 2 }}>
        {data.caption}
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
            setOpen(false)
          }}
        />
      </MUIDialogActions>
    </MUIDialog>
  )
}
