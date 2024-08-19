import { useLang } from "shared/context/Lang"
import {
  Context, createContext, FC, PropsWithChildren,
  ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { addEvent, dispatch } from "shared/lib/event"
import { Dialog as MUIDialog, DialogProps as MUIDialogProps } from "@mui/material"
import { Box } from "shared/ui/box"
import * as React from "react"
import {
  useMutation, UseMutationOptions, useQuery, UseQueryOptions,
} from "@tanstack/react-query"
import { SaveButton } from "shared/ui/dialog/save-button"
import { DialogHeader } from "shared/ui/dialog/dialog-header"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import {
  makeAutoObservable, reaction, runInAction, toJS,
} from "mobx"
import { observer } from "mobx-react-lite"

interface DialogProps extends Omit<MUIDialogProps, "container" | "open"> {
  langBase?: string
  title?: string
  container?: ReactNode
  onGetByIdOptions?: (id: number | null) => UseQueryOptions<any, any, any, any>
  onUpdateOptions?: (id: number | null) => UseMutationOptions<any, any, any>
  onCreateOptions?: () => UseMutationOptions<any, any, any>
  getData: () => any
  setData: (data: any) => any
  storeReset: () => void
  size?: "auto"
  onSave?: (data: any) => void
  onEdit?: (data: any) => void
}

export class DialogStore {
  // open = true
  open = false
  id: null | number = null
  localData?: Record<string, any>

  fullScreen = false
  data: any = {}

  constructor() {
    makeAutoObservable(this, { }, { autoBind: true })
  }

  openDialog(id: number | null, localData?: Record<string, any>) {
    this.open = true
    this.id = id
    this.localData = localData
  }

  closeDialog() {
    this.id = null
    this.open = false
  }

  get isEdit() {
    return this.id !== null
  }

  setFullScreen(fullScreen: boolean | ((fullScreen: boolean) => boolean)) {
    this.fullScreen = typeof fullScreen === "boolean"
      ? fullScreen
      : fullScreen(this.fullScreen)
  }
}

export const dialogStore = new DialogStore()
export const createDialogStore = () => new DialogStore()

/** CONTEXT */
export const useStrictContext = <T, >(context: Context<T | null>) => {
  const value = useContext(context)
  // if (value === null) throw new Error("Strict context not passed")

  return value as T
}

export const createStrictContext = <T, >() => createContext<T | null>(null)

const RootDialogStoreContext = createStrictContext<DialogStore>()

export const useDialogStore = () => useStrictContext(RootDialogStoreContext)

export const StoreDialogProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const [state] = useState(createDialogStore)

  return (
    <RootDialogStoreContext.Provider value={state}>
      {children}
    </RootDialogStoreContext.Provider>
  )
}
/** CONTEXT */

export interface OpenDialogProps {
  localData?: Record<string, any>
  id?: number
}

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
    onSave,
    onEdit,
    size,
    ...other
  } = props

  const store = useDialogStore()

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const { t } = useTranslation("translation", { keyPrefix: langBase })
  const methods = useFormContext()

  useEffect(() => addEvent(`${langBase}.dialog.edit` as any, (data: OpenDialogProps) => {
    methods.reset()
    methods.unregister()

    store.openDialog(data?.id ?? null, data?.localData)
  }), [langBase])

  let data = store.localData
  if (onGetByIdOptions) {
    const query = useQuery(onGetByIdOptions(store.id))
    data = query.data
  }

  let onUpdate
  if (onUpdateOptions) {
    const { mutate } = useMutation(onUpdateOptions(store.id))
    onUpdate = mutate
  }

  let onCreate
  if (onCreateOptions) {
    const { mutate } = useMutation(onCreateOptions())
    onCreate = mutate
  }

  useEffect(() => () => storeReset(), [])

  useEffect(() => {
    if (!data) return

    if (store.id) setData(data)

    const keys = Object.keys(data)
    if (keys.length === 0) return

    keys.forEach((key) => methods.setValue(key, (data as any)[key]))

    methods.trigger().then((r) => r)
  }, [data, store.open])

  const onClose = () => {
    store.closeDialog()
    storeReset()
  }

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      const mergedData = { ...data, ...getData() }
      if (store.isEdit) {
        if (onUpdate) onUpdate(mergedData)
        if (onEdit) onEdit(mergedData)
      } else {
        if (onCreate) onCreate(mergedData)
        if (onSave) onSave(mergedData)
      }

      // onClose()
    })()
  }

  return (
    <MUIDialog
      fullScreen={store.fullScreen}
      open={store.open}
      {...other}
      PaperProps={{
        sx: {
          display: "flex",
          borderRadius: 4,
          ...(store.fullScreen ? {} : {
            maxWidth: 900,
            width: 1,
            height: size ?? 580,
            overflow: "unset",
          }),
          ...(other?.PaperProps?.sx ?? {}),
        },
      }}
    >
      <Box sx={{ mx: 1 }}>
        <DialogHeader
          title={t(`dialog.title.${store.isEdit ? "edit" : "create"}`, { value: title ?? "" })}
        />
      </Box>
      {container}
      {useMemo(() => (
        <Box
          flex
          ai
          row
          gap
          sx={{
            alignSelf: "flex-end",
            p: 1,
          }}
        >
          <SaveButton onClick={onSubmit} />
          <CancelButton
            onClick={onClose}
          />
        </Box>
      ), [])}
    </MUIDialog>
  )
})
