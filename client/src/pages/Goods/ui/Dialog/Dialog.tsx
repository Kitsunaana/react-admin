import * as React from "react"
import {
  useCallback, useMemo, useState,
} from "react"
import { DialogLayout } from "pages/Goods/ui/Dialog/DialogLayout"
import { DialogHeader } from "pages/Goods/ui/Dialog/DialogHeader"
import { DialogContent } from "pages/Goods/ui/Dialog/DialogContent"
import { DialogActions } from "pages/Goods/ui/Dialog/DialogActions"
import { FormProvider, useForm } from "react-hook-form"
import { Tabs } from "pages/Goods/ui/Dialog/Tabs"

export interface Option {
  value: string | null
  icon?: string
  tab?: number
}

interface UseFormProps {
  category: Option
  caption: Option
  description: string
}

export const Dialog = () => {
  const [open, setOpen] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [tab, setTab] = useState<number>(0)

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }, [])

  const methods = useForm<UseFormProps>({
    defaultValues: {
      category: { value: null, tab: 0 },
      caption: { value: "", tab: 0 },
      description: "",
    },
  })

  const memoizedDialogHeader = useMemo(() => (
    <DialogHeader
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
    />
  ), [fullScreen, setFullScreen])

  const memoizedTabs = useMemo(() => (
    <Tabs
      tab={tab}
      onChange={handleChange}
    />
  ), [tab, handleChange])

  const memoizedDialogContent = useMemo(() => <DialogContent tab={tab} />, [tab])

  const memoizedDialogActions = useMemo(() => <DialogActions isValid={false} onClose={setOpen} />, [setOpen])

  return (
    <FormProvider {...methods}>
      <DialogLayout
        open={open}
        fullScreen={fullScreen}
        header={memoizedDialogHeader}
        tabs={memoizedTabs}
        content={memoizedDialogContent}
        actions={memoizedDialogActions}
      />
    </FormProvider>
  )
}
