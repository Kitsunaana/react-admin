import * as React from "react"
import {
  useCallback, useEffect, useMemo, useState,
} from "react"
import { FormProvider, useForm } from "react-hook-form"
import { addEvent } from "shared/lib/event"
import { Dialog as BaseDialog } from "shared/ui/dialog"
import { DialogHeader } from "shared/ui/dialog-header"
import { TabsContainer } from "features/goods/edit/ui/tabs-container"
import { DialogContent } from "features/goods/edit/ui/dialog-content"
import Button from "@mui/material/Button"

export interface Option {
  value: string | null;
  icon?: string;
  tab?: number;
}

interface UseFormProps {
  category: Option;
  caption: Option;
  description: string;
}

const tabs = [
  { id: 0, caption: "Общие параметры", icon: "done" },
  { id: 1, caption: "Описание", icon: "description" },
  { id: 2, caption: "Фото", icon: "photo" },
  { id: 3, caption: "Прочее", icon: "other" },
  { id: 4, caption: "Характеристики", icon: "characteristic" },
  { id: 5, caption: "Алтернативные названия", icon: "alternativeName" },
]

export const DialogEdit = () => {
  const [open, setOpen] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [tab, setTab] = useState<number>(0)

  useEffect(() => addEvent("dialog.goods.edit" as any, (data: { id: number }) => {
    setOpen(true)
  }), [])

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue)
    },
    [],
  )

  const methods = useForm<UseFormProps>({
    defaultValues: {
      category: { value: "Option 2", tab: 0 },
      caption: { value: "Good 1", tab: 0 },
      description: "[etnf rfrfz-njs",
    },
  })

  const memoizedDialogHeader = useMemo(
    () => (
      <DialogHeader
        title="Редактирование товара"
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
        <Button disabled={!methods.formState.errors} onClick={() => setOpen(false)}>
          Сохранить
        </Button>
        <Button onClick={() => setOpen(false)} autoFocus>
          Отмена
        </Button>
      </>
    ),
    [setOpen, methods.formState.errors],
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
