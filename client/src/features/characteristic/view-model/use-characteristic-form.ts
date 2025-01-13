import { useForm } from "react-hook-form"
import { FormEvent } from "react"
import { CharacteristicFields, characteristicFieldsSchema } from "entities/characteristic"
import { zodResolver } from "@hookform/resolvers/zod"

export type FormData = {
  caption: string | null
  unit: string | null
  value: string
  hideClient: boolean
}

export const useCharacteristicForm = ({
  onSubmit,
  defaultFields,
}: {
  onSubmit: (data: CharacteristicFields) => void
  defaultFields?: FormData
}) => {
  const form = useForm<CharacteristicFields>({
    resolver: zodResolver(characteristicFieldsSchema),
  })

  const getDefaultValue = (): FormData => {
    if (defaultFields !== undefined) return defaultFields

    return {
      caption: null,
      unit: null,
      hideClient: false,
      value: "",
    }
  }

  const defaultValue = getDefaultValue()

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    form.handleSubmit(onSubmit)()
  }

  return {
    handleSubmit,
    defaultValue,
    form,
  }
}
