import {
  Control,
  FormState,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"
import { useEffect } from "react"
import * as React from "react"
import { TabPanel } from "shared/ui/TabPanel"
import { Parameters } from "pages/Goods/ui/Dialog/Parameters"
import { Description } from "pages/Goods/ui/Dialog/Description"

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

interface DialogContentProps {
  tab: number
  errors: FormState<UseFormProps>["errors"]
  register: UseFormRegister<UseFormProps>
  getValues: UseFormGetValues<UseFormProps>
  setValue: UseFormSetValue<UseFormProps>
  control: Control<UseFormProps, any>
  watch: UseFormWatch<UseFormProps>
}

export const DialogContent = (props: DialogContentProps) => {
  const {
    tab, getValues, setValue, errors, control, watch, register,
  } = props

  return (
    <>
      <TabPanel value={tab} index={0}>
        <Parameters
          control={control}
          errors={errors}
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Description
          watch={watch}
          errors={errors}
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
      </TabPanel>
    </>
  )
}
