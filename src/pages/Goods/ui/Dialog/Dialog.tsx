import * as React from "react"
import {
  useCallback, useEffect, useLayoutEffect, useState,
} from "react"
import { DialogLayout } from "pages/Goods/ui/Dialog/DialogLayout"
import { DialogHeader } from "pages/Goods/ui/Dialog/DialogHeader"
import { Tabs } from "shared/ui/Tabs"
import { DialogContent } from "pages/Goods/ui/Dialog/DialogContent"
import { DialogActions } from "pages/Goods/ui/Dialog/DialogActions"
import { useForm, useFormState } from "react-hook-form"

export interface Option {
  value: string
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

  const {
    setValue, register, watch, getValues, trigger, handleSubmit, control, formState: { errors, isValid }, getFieldState,
  } = useForm<UseFormProps>({
    defaultValues: {
      category: { value: null as any, tab: 0 },
      caption: { value: "", tab: 0 },
      description: "",
    },
    mode: "onChange",
  })

  const caption = watch("caption")
  const category = watch("category")
  const description = watch("description")

  useEffect(() => {
    trigger(["category", "caption"])
    handleSubmit(console.log)()
  }, [category, caption, description])

  return (
    <DialogLayout
      open={open}
      fullScreen={fullScreen}
      header={(
        <DialogHeader
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      )}
      tabs={(
        <Tabs
          control={control}
          getValues={getValues}
          errors={errors}
          tab={tab}
          getFieldState={getFieldState}
          onChange={handleChange}
        />
      )}
      content={(
        <DialogContent
          register={register}
          watch={watch}
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          tab={tab}
        />
      )}
      actions={(<DialogActions isValid={false} onClose={setOpen} />)}
    />
  )
}
