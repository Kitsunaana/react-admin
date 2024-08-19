import { DialogEdit, DialogStore, useDialogStore } from "shared/ui/dialog/dialog-edit"
import { queryOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { Box } from "shared/ui/box"
import Autocomplete from "@mui/material/Autocomplete"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import { Input } from "shared/ui/input"
import { Select } from "shared/ui/select"
import {
  Controller, FormProvider, useForm, useFormContext,
} from "react-hook-form"
import {
  Context, createContext, FC, PropsWithChildren, useContext, useEffect, useState,
} from "react"
import { makeAutoObservable } from "mobx"
import { createRootStore, RootStore } from "features/categories/create-and-edit/model/stores/dialog-store"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import {
  characteristicsSchema,
  TCharacteristics,
  transformCharacteristic,
  transformCharacteristics,
} from "features/characteristics/model/schemas"
import { validation } from "shared/lib/validation"

interface ICharacteristic {
  id: string | number
  caption: string
  unit: string | null
  value: string
  hideClient: boolean

  local?: boolean
  deleted?: boolean
}

export class CharacteristicsStore {
  items: Array<ICharacteristic> = []

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  create(data: ICharacteristic) {
    this.items.push({ ...data, id: nanoid(), local: true })
  }

  edit(data: ICharacteristic) {
    this.items = this.items.map((item) => (item.id === data.id ? { ...item, ...data } : item))
  }

  getData() {
    return {
      items: this.items.map((item) => ({
        caption: item.caption,
        units: item.unit,
        value: item.value,
        hideClient: item.hideClient,
      })),
    }
  }

  setCharacteristics(characteristics: any) {
    const data = validation(characteristicsSchema, characteristics)
    const transformedCharacteristics = transformCharacteristics(data)

    this.items = transformedCharacteristics
  }
}

interface CharacteristicsDialogProps {
  getData?: () => void
  storeReset?: () => void
  setData?: (dat: any) => void
}

export const onGetCharacteristicByIdOptions = (id: number | null) => queryOptions({
  enabled: id !== null,
  queryKey: ["characteristics", id],
  queryFn: () => $axios.get(`/characteristics/${id}`),
})

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
]

export const Container = () => {
  const methods = useFormContext()

  useEffect(() => {
    methods.trigger()
  }, [])

  return (
    <Box flex gap sx={{ p: 1, height: 1 }}>
      <Controller
        name="caption"
        rules={{
          required: "Поле должно быть заполнено",
          minLength: {
            value: 3,
            message: "Поле должно быть не менее 3 символов",
          },
        }}
        render={({ field, fieldState }) => (
          <Select
            value={field.value}
            freeSolo
            onChange={(event, option) => {
              field.onChange(option)
              methods.trigger()
            }}
            options={top100Films.map((option) => option.title)}
            InputProps={{
              label: "Название",
              ...field,
              onChange: (event) => {
                field.onChange(event)
                methods.trigger()
              },
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : null,
            }}
          />
        )}
      />

      <Controller
        name="units"
        render={({ field }) => (
          <Select
            freeSolo
            value={field.value}
            onChange={(event, option) => field.onChange(option)}
            options={top100Films.map((option) => option.title)}
            InputProps={{
              label: "Единицы измерения",
              ...field,
            }}
          />
        )}
      />

      <Controller
        name="value"
        rules={{
          required: "Количество символов должно быть больше 1",
        }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            onChange={(event) => {
              field.onChange(event)
              methods.trigger()
            }}
            size="small"
            label="Значение"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
      />

      <Controller
        name="hideClient"
        render={({ field }) => (
          <FormControlLabel
            control={(
              <Checkbox {...field} checked={field.value} />
            )}
            label="Скрыть у клиента"
          />
        )}
      />
    </Box>
  )
}

interface UseCharacteristicsFormProps extends Omit<ICharacteristic, "id">{}

export const CharacteristicsDialog = observer((props: CharacteristicsDialogProps) => {
  const { storeReset, setData, getData } = props

  const methods = useForm<UseCharacteristicsFormProps>({
    defaultValues: {
      caption: "",
      unit: null,
      value: "",
      hideClient: true,
    },
  })
  const store = useDialogStore()
  const { characteristics } = useStores()

  return (
    <FormProvider {...methods}>
      <DialogEdit
        PaperProps={{
          sx: {
            maxWidth: store.fullScreen ? "95%" : 840,
            maxHeight: "95%",
          },
        }}
        size="auto"
        langBase="characteristics"
        getData={() => {}}
        storeReset={() => {}}
        setData={console.log}
        onSave={characteristics.create}
        onEdit={characteristics.edit}
        container={<Container />}
      />
    </FormProvider>
  )
})
