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

interface ICharacteristic {
  id: string
  caption: string
  units: string | null
  value: string
  hideClient: boolean

  local?: boolean
  deleted?: boolean
}

export class CharacteristicsStore {
  items: Array<ICharacteristic> = [
    {
      id: "1", caption: "new", units: null, value: "123", hideClient: false,
    },
    {
      id: "2", caption: "old", units: "qwe", value: "123", hideClient: true, local: true,
    },
  ]

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  create(data: ICharacteristic) {
    console.log(data)
    this.items.push({ ...data, id: nanoid(), local: true })
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
      units: null,
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
        onGetByIdOptions={onGetCharacteristicByIdOptions}
        setData={console.log}
        onSave={characteristics.create}
        container={<Container />}
      />
    </FormProvider>
  )
})
