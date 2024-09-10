import { useLang } from "shared/context/Lang"
import {
  ReactNode, useEffect, useMemo, useState,
} from "react"
import { useTranslation } from "react-i18next"
import { DeepPartial, useForm, useFormContext } from "react-hook-form"
import {
  Button, Dialog as MUIDialog, DialogProps as MUIDialogProps, Skeleton,
} from "@mui/material"
import { Box } from "shared/ui/box"
import * as React from "react"
import {
  useMutation, UseMutationOptions, useQuery, UseQueryOptions,
} from "@tanstack/react-query"
import { SaveButton } from "shared/ui/dialog/save-button"
import { DialogHeader } from "shared/ui/dialog/dialog-header"
import { CancelButton } from "shared/ui/dialog/cancel-button"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { Text } from "shared/ui/text"
import { getFormSubmissionInfo } from "react-router-dom/dist/dom"

interface DialogProps extends Omit<MUIDialogProps, "container" | "open"> {
  langBase?: string
  title?: string
  container?: ReactNode
  tabs?: ReactNode
  onGetByIdOptions?: (id: number | null) => UseQueryOptions<any, any, any, any>
  onUpdateOptions?: (id: number | null) => UseMutationOptions<any, any, any>
  onCreateOptions?: () => UseMutationOptions<any, any, any>
  getData?: () => any
  setData?: (data: any) => any
  storeReset?: () => void
  size?: "auto"
  onSave?: (data: any) => void
  onEdit?: (data: any) => void
  height?: number | string
  hideActions?: boolean
}

export const DialogEdit = observer((props: DialogProps) => {
  const {
    langBase: langBaseProps,
    height,
    setData,
    title,
    container,
    tabs,
    hideActions,
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

  const store = useEditDialogStore()

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const { t } = useTranslation("translation", { keyPrefix: langBase })
  const methods = useFormContext()

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    methods.reset()
    methods.unregister()

    if (store?.id) setIsEdit(true)
  }, [langBase, store.open])

  let data = store.localData
  let isLoading = false
  if (onGetByIdOptions) {
    isLoading = true
    const query = useQuery(onGetByIdOptions(store.id as number))
    data = query.data
    isLoading = query.isFetching || query.isLoading
  }

  let onUpdate
  let canCloseDialog = true
  if (onUpdateOptions) {
    canCloseDialog = false
    const { mutate } = useMutation(onUpdateOptions(store.id as number))
    onUpdate = mutate
  }

  let onCreate
  if (onCreateOptions) {
    const { mutate } = useMutation(onCreateOptions())
    onCreate = mutate
  }

  useEffect(() => () => storeReset?.(), [])

  useEffect(() => {
    if (!data) return

    if (store.id) setData?.(data)
    const keys = Object.keys(data)
    if (keys.length === 0) return

    keys.forEach((key) => methods.setValue(key, (data as any)[key]))

    methods.trigger().then((r) => r)
  }, [data, store.open])

  const onClose = () => {
    store.closeDialog()
    storeReset?.()
  }

  const callFunc = (callbacks: Array<Function | undefined>, data: Record<string, any>) => (
    callbacks.forEach((callback) => typeof callback === "function" && callback(data))
  )

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      const mergedData = { ...data, ...getData?.() }

      const _ = store.id
        ? callFunc([onUpdate, onEdit], mergedData)
        : callFunc([onCreate, onSave], mergedData)

      if (canCloseDialog) onClose()
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
        {isLoading ? (
          <Skeleton sx={{ borderRadius: 2, my: 1 }} variant="rectangular" height={40.19} />
        ) : (
          <DialogHeader
            hideActions={!!hideActions}
            title={t(`title.${isEdit ? "edit" : "create"}`, { value: title ?? "" })}
          />
        )}

      </Box>
      <Box grow sx={{ height: height ?? 450, pt: 0 }}>
        <Box flex sx={{ height: 1 }}>
          {isLoading ? <Skeleton sx={{ mx: 1, borderRadius: 2 }} variant="rectangular" height={40.19} /> : tabs}
          <Box sx={{ px: 1, height: 1 }}>
            {isLoading ? <Skeleton sx={{ borderRadius: 2 }} height="100%" /> : container}
          </Box>
        </Box>
      </Box>
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

interface DialogPropsV2 extends Omit<MUIDialogProps, "container" | "open"> {
  langBase?: string
  title?: string
  container?: ReactNode
  tabs?: ReactNode
  onGetByIdOptions: (id: number | null) => UseQueryOptions<any, any, any, any>
  onUpdateOptions: (id: number | null, onClose: () => void) => UseMutationOptions<any, any, any>
  onCreateOptions: (onClose: () => void) => UseMutationOptions<any, any, any>
  getData?: () => any
  setData?: (data: any) => any
  storeReset?: () => void
  size?: "auto"
  height?: number | string
  hideActions?: boolean
  defaultValues?: DeepPartial<any>
  getCopyData?: () => any
  settings?: ReactNode
  settingInputs?: Record<string, boolean>
}

export const DialogEditV2 = observer((props: DialogPropsV2) => {
  const {
    langBase: langBaseProps,
    title,
    height,
    size,
    defaultValues,
    hideActions,
    tabs,
    container,
    settings,
    settingInputs,
    setData,
    getData,
    storeReset,
    onGetByIdOptions,
    onUpdateOptions,
    onCreateOptions,
    getCopyData,
    ...other
  } = props

  const store = useEditDialogStore()
  const langBase = langBaseProps ?? useLang()?.lang
  const methods = useFormContext()
  const [isEdit, setIsEdit] = useState(false)

  const onClose = () => store.closeDialog()

  const {
    data, isLoading, isFetching,
  } = useQuery(onGetByIdOptions(store.id as number))
  const { mutate: onUpdate, isPending: isPendingUpdate, isSuccess: isSuccessUpdate } = useMutation(
    onUpdateOptions(store.id as number, () => {}),
  )
  const { mutate: onCreate, isPending: isPendingCreate } = useMutation(onCreateOptions(() => {}))

  const isShowSkeleton = isFetching || isLoading || isPendingUpdate || isPendingCreate

  useEffect(() => {
    if (isSuccessUpdate) onClose()
  }, [isSuccessUpdate])

  useEffect(() => {
    if (!store.open) {
      return () => {
        storeReset?.()
        methods.reset(defaultValues ?? {})
        setIsEdit(false)
      }
    }
  }, [store.open])

  useEffect(() => {
    if (store?.id) setIsEdit(true)

    if (data) {
      methods.reset(data)
      setData?.(data)
    }
  }, [data, langBase, store.id])

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      const mergedData = { ...data, ...getData?.() }

      if (store.id) onUpdate(mergedData)
      else onCreate(mergedData)
    })()
  }

  const memoizedGetValuesFn = useMemo(() => [methods.getValues, getCopyData], [])

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
        {isShowSkeleton ? (
          <Skeleton sx={{ borderRadius: 2, my: 1 }} variant="rectangular" height={40.19} />
        ) : (
          <DialogHeader
            settingInputs={settingInputs}
            settings={settings}
            hideActions={!!hideActions}
            setData={setData}
            setValues={methods.reset}
            getValues={memoizedGetValuesFn}
            title={(
              <Text
                onlyText
                name={`title.${isEdit ? "edit" : "create"}`}
                value={title ?? ""}
              />
            )}
          />
        )}

      </Box>
      <Box grow sx={{ height: height ?? 450, pt: 0 }}>
        <Box flex sx={{ height: 1 }}>
          {isShowSkeleton ? (
            <Skeleton
              sx={{ mx: 1, borderRadius: 2 }}
              variant="rectangular"
              height={40.19}
            />
          ) : tabs}
          <Box sx={{ px: 1, height: 1 }}>
            {isShowSkeleton ? (
              <Skeleton
                sx={{ borderRadius: 2 }}
                height="100%"
              />
            ) : container}
          </Box>
        </Box>
      </Box>
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
        <SaveButton
          onClick={onSubmit}
          disabled={isPendingUpdate || isPendingCreate}
        />
        <CancelButton
          onClick={onClose}
          disabled={isPendingUpdate || isPendingCreate}
        />
      </Box>
    </MUIDialog>
  )
})
