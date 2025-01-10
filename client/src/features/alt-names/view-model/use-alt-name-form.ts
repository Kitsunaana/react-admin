import { useForm } from "react-hook-form"
import { FormEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AltNameFields, altNameFieldsSchema, Locale } from "entities/alt-name"

export type FormData = {
  caption: string
  description: string
  locale: Locale | null
}

export type FormLocales = Locale & {
  disabled?: boolean
}

export const useAltNameForm = ({
  onSubmit,
  defaultFields,
}: {
  onSubmit: (data: AltNameFields) => void
  defaultFields?: FormData
}) => {
  const form = useForm<AltNameFields>({
    resolver: zodResolver(altNameFieldsSchema),
  })

  const getDefaultValue = (): FormData => {
    if (defaultFields !== undefined) return defaultFields

    return {
      caption: "",
      description: "",
      locale: null,
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
