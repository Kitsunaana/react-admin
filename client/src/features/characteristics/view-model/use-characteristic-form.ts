import { useForm } from "react-hook-form"
import { FormEvent } from "react"
import { CharacteristicFields } from "../domain/types"

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
  const form = useForm<CharacteristicFields>()

  const getDefaultValue = (): FormData => {
    if (defaultFields !== undefined) return defaultFields

    return {
      caption: null,
      unit: null,
      hideClient: false,
      value: "",
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    form.handleSubmit(onSubmit)()
  }

  const handleKeyDownSubmit = () => form.handleSubmit(onSubmit)()

  const defaultValue = getDefaultValue()

  return {
    handleFormSubmit,
    handleKeyDownSubmit,
    defaultValue,
    form,
  }
}
