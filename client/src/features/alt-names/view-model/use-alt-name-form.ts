import { useForm } from "react-hook-form"
import { FormEvent } from "react"
import { AltNameFields, Locale } from "../domain/types"

export type FormData = {
  caption: string
  description: string
  locale: Locale | null
}

export const useAltNameForm = ({
  onSubmit,
  defaultFields,
}: {
  onSubmit: (data: AltNameFields) => void
  defaultFields?: FormData
}) => {
  const form = useForm<AltNameFields>()

  const getDefaultValue = (): FormData => {
    if (defaultFields !== undefined) return defaultFields

    return {
      caption: "",
      description: "",
      locale: null,
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
