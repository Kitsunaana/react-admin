import { useLang } from "shared/context/Lang"
import {
  ReactNode, useEffect, useMemo, useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { addEvent } from "shared/lib/event"
import MUIDialog from "@mui/material/Dialog"
import { Box } from "shared/ui/box"
import * as React from "react"
import {
  useMutation, UseMutationOptions, useQuery, UseQueryOptions,
} from "@tanstack/react-query"
import { SaveButton } from "shared/ui/dialog/save-button"
import { DialogHeader } from "shared/ui/dialog/dialog-header"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { makeAutoObservable, reaction } from "mobx"
import { observer } from "mobx-react-lite"

export const useApplyFields = (data: Record<string, any>) => {
  const { setValue, trigger } = useFormContext()

  useEffect(() => {
    const keys = Object.keys(data)

    if (keys.length === 0) return

    keys.forEach((key) => setValue(key, data[key]))

    trigger()
      .then((r) => r)
  }, [data])
}

interface DialogProps {
  langBase?: string
  title?: string
  container: ReactNode
  onGetByIdOptions: (id: number | null) => UseQueryOptions
  onUpdateOptions: (id: number | null) => UseMutationOptions<any, any, any>
  onCreateOptions: () => UseMutationOptions<any, any, any>
}

export class DialogStore {
  state: {open: boolean; id: null | number} = {
    open: false,
    id: null,
  }

  data: any = {}

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  openDialog(id: number | null) {
    this.state = { id, open: true }
  }

  closeDialog() {
    this.state = { id: null, open: false }
  }

  setData(data: any) {
    console.log(data)
    this.data = data
  }

  get isEdit() {
    return this.state.id !== null
  }
}

export const dialogStore = new DialogStore()

export const DialogEdit = observer((props: DialogProps) => {
  const {
    langBase: langBaseProps, title, container, onGetByIdOptions, onUpdateOptions, onCreateOptions,
  } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const [fullScreen, setFullScreen] = useState(false)
  const { t } = useTranslation("translation", { keyPrefix: langBase })
  const methods = useFormContext()

  useEffect(() => addEvent(`${langBase}.dialog.edit` as any, (data: { id?: number }) => {
    dialogStore.openDialog(data?.id ?? null)
  }), [langBase])

  const { data } = useQuery(onGetByIdOptions(dialogStore.state.id))
  const { mutate: onUpdate } = useMutation(onUpdateOptions(dialogStore.state.id))
  const { mutate: onCreate } = useMutation(onCreateOptions())

  useEffect(() => {
    dialogStore.setData(data)
  }, [data])

  useEffect(() => {
    if (!data) return

    const keys = Object.keys(data)
    if (keys.length === 0) return

    keys.forEach((key) => methods.setValue(key, data[key], { shouldValidate: true }))

    methods.trigger().then((r) => r)
  }, [dialogStore.data])

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      if (dialogStore.isEdit) onUpdate(data)
      else onCreate(data)

      dialogStore.closeDialog()
    })()
  }

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={dialogStore.state.open}
      PaperProps={{
        sx: {
          display: "flex",
          borderRadius: 4,
          ...(fullScreen ? {} : {
            maxWidth: 900,
            width: 1,
            height: 580,
            overflow: "unset",
          }),
        },
      }}
    >
      <Box sx={{ mx: 1 }}>
        <DialogHeader
          title={t(`dialog.title.${dialogStore.isEdit ? "edit" : "create"}`, { value: title ?? "" })}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      </Box>
      <Box grow sx={{ height: 450, p: 1, pt: 0 }}>
        {container}
      </Box>
      {useMemo(() => (
        <Box flex ai row gap sx={{ alignSelf: "flex-end", p: 1 }}>
          <SaveButton onClick={onSubmit} />
          <CancelButton
            onClick={() => {
              methods.reset()
              dialogStore.closeDialog()
            }}
          />
        </Box>
      ), [])}
    </MUIDialog>
  )
})
