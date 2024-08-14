import { useLang } from "shared/context/Lang"
import {
  ReactNode, useEffect, useMemo,
} from "react"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { addEvent, dispatch } from "shared/lib/event"
import MUIDialog from "@mui/material/Dialog"
import { Box } from "shared/ui/box"
import * as React from "react"
import {
  useMutation, UseMutationOptions, useQuery, UseQueryOptions,
} from "@tanstack/react-query"
import { SaveButton } from "shared/ui/dialog/save-button"
import { DialogHeader } from "shared/ui/dialog/dialog-header"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { makeAutoObservable, reaction, toJS } from "mobx"
import { observer } from "mobx-react-lite"

interface DialogProps {
  langBase?: string
  title?: string
  container: ReactNode
  onGetByIdOptions: (id: number | null) => UseQueryOptions
  onUpdateOptions: (id: number | null) => UseMutationOptions<any, any, any>
  onCreateOptions: () => UseMutationOptions<any, any, any>
  getData: () => any
  setData: (data: any) => any
  storeReset: () => void
}

export class DialogStore {
  state: {open: boolean; id: null | number} = {
    open: false,
    id: null,
  }

  fullScreen = false
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

  get isEdit() {
    return this.state.id !== null
  }

  setFullScreen(fullScreen: boolean | ((fullScreen: boolean) => boolean)) {
    this.fullScreen = typeof fullScreen === "boolean"
      ? fullScreen
      : fullScreen(this.fullScreen)
  }
}

export const dialogStore = new DialogStore()

export const DialogEdit = observer((props: DialogProps) => {
  const {
    langBase: langBaseProps,
    setData,
    title,
    container,
    onGetByIdOptions,
    onUpdateOptions,
    onCreateOptions,
    getData,
    storeReset,
  } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const { t } = useTranslation("translation", { keyPrefix: langBase })
  const methods = useFormContext()

  useEffect(() => addEvent(`${langBase}.dialog.edit` as any, (data: { id?: number }) => {
    dialogStore.openDialog(data?.id ?? null)
  }), [langBase])

  const { data } = useQuery(onGetByIdOptions(dialogStore.state.id))
  const { mutate: onUpdate } = useMutation(onUpdateOptions(dialogStore.state.id))
  const { mutate: onCreate } = useMutation(onCreateOptions())

  useEffect(() => {
    setData(data)
  }, [data])

  useEffect(() => {
    if (!data) return

    const keys = Object.keys(data)
    if (keys.length === 0) return

    keys.forEach((key) => methods.setValue(key, data[key], { shouldValidate: true }))

    methods.trigger().then((r) => r)
  }, [data])

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      const mergedData = { ...data, ...getData() }
      // console.log({ ...data, ...getData() })
      if (dialogStore.isEdit) onUpdate(mergedData)
      else onCreate(mergedData)

      /* methods.reset()
      dialogStore.closeDialog() */
      storeReset()
    })()
  }

  return (
    <MUIDialog
      fullScreen={dialogStore.fullScreen}
      open={dialogStore.state.open}
      PaperProps={{
        sx: {
          display: "flex",
          borderRadius: 4,
          ...(dialogStore.fullScreen ? {} : {
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
          fullScreen={dialogStore.fullScreen}
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
              storeReset()
              dialogStore.closeDialog()
            }}
          />
        </Box>
      ), [])}
    </MUIDialog>
  )
})
