import * as React from "react"
import {
  useCallback, useEffect, useMemo, useState,
} from "react"
import { FormProvider, useForm } from "react-hook-form"
import { addEvent } from "shared/lib/event"
import { Dialog as BaseDialog } from "shared/ui/dialog"
import { DialogHeader } from "shared/ui/dialog-header"
import Button from "@mui/material/Button"
import { useCreateCategory } from "features/categories/create/model/use-create-category"
import { DialogContent } from "./dialog-content"
import { TabsContainer } from "./tabs-container"

export interface Option {
  value: string | null;
  icon?: string;
  tab?: number;
}

export interface UseFormProps {
  caption: Option;
  description: string;
  images: {
    caption: string,
    data: File,
    type: string,
    id: string,
    deleted?: boolean
  }[]
}

const tabs = [
  { id: 0, caption: "Общие параметры", icon: "done" },
  { id: 1, caption: "Фото", icon: "photo" },
  { id: 2, caption: "Позиция текста на фото", icon: "positionPhoto" },
  { id: 3, caption: "Прочее", icon: "other" },
  { id: 4, caption: "Характеристики", icon: "characteristic" },
  { id: 5, caption: "Алтернативные названия", icon: "alternativeName" },
  { id: 6, caption: "Теги", icon: "tags" },
]

export const DialogCreate = () => {
  const [open, setOpen] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [tab, setTab] = useState<number>(1)

  const { createCategory } = useCreateCategory()

  const methods = useForm<UseFormProps>({
    defaultValues: {
      caption: { value: "", tab: 0 },
      description: "",
    },
  })

  useEffect(() => addEvent("dialog.catalog.create" as any, () => {
    setOpen(true)
  }), [])

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }, [])

  const handleSubmit = () => {
    methods.handleSubmit((data) => {
      createCategory({
        caption: data.caption.value as string,
        description: data.description,
        images: data.images,
      } as any)
    })()
    methods.reset()
    setOpen(false)
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
    () => <TabsContainer tabs={tabs} tab={tab} onChange={handleChange} />,
    [tab, handleChange],
  )

  const memoizedDialogContent = useMemo(() => (
    <DialogContent tab={tab} />
  ), [tab])

  const memoizedDialogActions = useMemo(
    () => (
      <>
        <Button
          disabled={!methods.formState.isValid}
          onClick={handleSubmit}
          color="primary"
          variant="outlined"
        >
          Сохранить
        </Button>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          color="warning"
        >
          Отмена
        </Button>
      </>
    ),
    [setOpen, methods.formState.isValid],
  )

  return (
    <FormProvider {...methods}>
      <BaseDialog
        fullScreen={fullScreen}
        open={open}
        header={memoizedDialogHeader}
        tabs={<TabsContainer tabs={tabs} tab={tab} onChange={handleChange} />}
        content={memoizedDialogContent}
        actions={memoizedDialogActions}
      />
    </FormProvider>
  )
}
