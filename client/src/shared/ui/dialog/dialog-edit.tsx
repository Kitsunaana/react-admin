import { useLang } from "shared/context/Lang"
import { ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { addEvent } from "shared/lib/event"
import MUIDialog from "@mui/material/Dialog"
import { Box } from "shared/ui/box"
import MUIDialogContent from "@mui/material/DialogContent"
import MUIDialogActions from "@mui/material/DialogActions"
import * as React from "react"
import {
  useMutation, UseMutationOptions, useQuery, UseQueryOptions,
} from "@tanstack/react-query"
import { SaveButton } from "shared/ui/dialog/save-button"
import { DialogHeader } from "shared/ui/dialog/dialog-header"
import { CancelButton } from "shared/ui/dialog/cancel-button"

export const useApplyFields = (data: Record<string, any>) => {
  const { setValue, trigger } = useFormContext()

  useEffect(() => {
    const keys = Object.keys(data)

    if (keys.length === 0) return

    keys.forEach((key) => {
      setValue(key, data[key])
    })

    trigger()
      .then((r) => r)
  }, [data])
}

interface DialogProps {
  langBase?: string
  title?: string
  container: ReactNode
  onUpdateOptions: (id: number | null) => UseMutationOptions<any, any, any, any>
  onCreateOptions: () => UseMutationOptions<any, any, any, any>
  onGetByIdOptions: (id: number | null) => UseQueryOptions
}

export const DialogEdit = (props: DialogProps) => {
  const {
    langBase: langBaseProps, title, container, onUpdateOptions, onCreateOptions, onGetByIdOptions,
  } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const [open, setOpen] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [id, setId] = useState<null | number>(null)
  const { t } = useTranslation("translation", { keyPrefix: langBase })
  const { handleSubmit, reset } = useFormContext()

  const { data } = useQuery(onGetByIdOptions(id))
  const { mutate: onUpdate } = useMutation(onUpdateOptions(id))
  const { mutate: onCreate } = useMutation(onCreateOptions())

  useApplyFields(data ?? {})

  useEffect(() => {
    if (!open) {
      setId(null)
      reset()
    }
  }, [open])

  useEffect(() => addEvent(`${langBase}.dialog.edit` as any, (data: { id?: number }) => {
    setOpen(true)
    if (data?.id) setId(data.id)
  }), [langBase])

  const isEdit = id !== null

  const onSubmit = (data: any) => {
    if (isEdit) onUpdate(data)
    else onCreate(data)

    reset()
    setOpen(false)
  }

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: 4,
          ...(fullScreen ? {} : {
            maxWidth: 900,
            width: 1,
            height: 580,
          }),
        },
      }}
    >
      <Box sx={{ mx: 1 }}>
        <DialogHeader
          title={t(`dialog.title.${isEdit ? "edit" : "create"}`, { value: title ?? "" })}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      </Box>
      <MUIDialogContent sx={{ height: 1, p: 1, pt: 0 }}>
        {container}
      </MUIDialogContent>
      <MUIDialogActions>
        <SaveButton onClick={handleSubmit(onSubmit)} />
        <CancelButton
          onClick={() => {
            reset()
            setOpen(false)
          }}
        />
      </MUIDialogActions>
    </MUIDialog>
  )
}
