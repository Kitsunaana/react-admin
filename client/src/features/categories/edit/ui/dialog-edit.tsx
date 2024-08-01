import * as React from "react"
import {
  useCallback, useEffect, useMemo, useState,
} from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { addEvent } from "shared/lib/event"
import { Dialog as BaseDialog } from "shared/ui/dialog"
import { DialogHeader } from "shared/ui/dialog-header"
import Button from "@mui/material/Button"
import { Text } from "shared/ui/text"
import { TabsContainer } from "shared/ui/tabs-container"
import { UseFormProps } from "features/categories/create/model/types"
import { useCreateCategory } from "features/categories/create/api/use-create-category"
import { DialogContent } from "./dialog-content"

const tabs = [
  { id: 0, caption: "Общие параметры", icon: "done" },
  { id: 1, caption: "Фото", icon: "photo" },
  { id: 2, caption: "Позиция текста на фото", icon: "positionPhoto" },
  { id: 3, caption: "Прочее", icon: "other" },
  { id: 4, caption: "Характеристики", icon: "characteristic" },
  { id: 5, caption: "Алтернативные названия", icon: "alternativeName" },
  { id: 6, caption: "Теги", icon: "tags" },
]

export const SaveCategoryButton = (props: { onClick: () => void }) => {
  const { onClick } = props

  const { formState: { isValid } } = useFormContext()

  return (
    <Button
      disabled={!isValid}
      onClick={onClick}
      color="primary"
      variant="outlined"
    >
      <Text langBase="global.dialog" name="save" />
    </Button>
  )
}

export const CancelCategoryButton = (props: { onClick: () => void }) => {
  const { onClick } = props

  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="warning"
    >
      <Text langBase="global.dialog" name="cancel" />
    </Button>
  )
}

export const DialogEdit = () => {
  const [open, setOpen] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)

  const { createCategory } = useCreateCategory()

  const methods = useForm<UseFormProps>({
    defaultValues: {
      caption: { value: "", tab: 0 },
      description: "",
    },
  })

  useEffect(() => addEvent("dialog.catalog.edit" as any, ({ id }: { id: number }) => {
    setOpen(true)
    console.log(id)
  }), [])

  const handleSubmit = () => {
    methods.handleSubmit((data) => {
      createCategory({
        caption: data.caption.value as string,
        description: data.description,
        images: data.images,
      } as any)
    })()
    // methods.reset()
  }

  const memoizedDialogHeader = useMemo(
    () => (
      <DialogHeader
        title="Создать элемент"
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
      />
    ),
    [fullScreen, setFullScreen],
  )

  const memoizedTabs = useMemo(
    () => <TabsContainer tabs={tabs} tab={1} requiredFields={["caption"]} />,
    [],
  )

  const memoizedDialogContent = useMemo(() => (
    <DialogContent tab={1} />
  ), [])

  const memoizedDialogActions = useMemo(
    () => (
      <>
        <SaveCategoryButton onClick={handleSubmit} />
        <CancelCategoryButton onClick={() => setOpen(false)} />
      </>
    ),
    [setOpen],
  )

  return (
    <FormProvider {...methods}>
      <BaseDialog
        fullScreen={fullScreen}
        open={open}
        header={memoizedDialogHeader}
        tabs={memoizedTabs}
        content={memoizedDialogContent}
        actions={memoizedDialogActions}
      />
    </FormProvider>
  )
}
