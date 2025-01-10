import { useForm } from "react-hook-form"
import { FormEvent } from "react"
import { TagFields, tagFieldsSchema } from "entities/tag"
import { zodResolver } from "@hookform/resolvers/zod"

export type FormData = {
  caption: null
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
  const form = useForm<TagFields>({
    resolver: zodResolver(tagFieldsSchema),
  })

  const getDefaultValue = (): FormData => {
    if (defaultFields !== undefined) return defaultFields

    return {
      caption: null,
      color: "#000",
      icon: null,
    }
  }

  const handleSubmit = form.handleSubmit(onSubmit)

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleSubmit()
  }

  return {
    defaultValue: getDefaultValue(),
    handleKeyDownSubmit: handleSubmit,
    handleFormSubmit,
    form,
  }
}
