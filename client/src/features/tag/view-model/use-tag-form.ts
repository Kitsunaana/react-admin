import { useForm } from "react-hook-form"
import { FormEvent } from "react"
import { TagFields } from "../domain/types"

export type FormData = {
  caption: string
  color: string
  icon: string | null
}

export const useTagForm = ({
  onSubmit,
  defaultFields,
}: {
  onSubmit: (data: TagFields) => void
  defaultFields?: FormData
}) => {
  const form = useForm<TagFields>()

  const getDefaultValue = (): FormData => {
    if (defaultFields !== undefined) return defaultFields

    return {
      caption: "",
      color: "#000",
      icon: null,
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
