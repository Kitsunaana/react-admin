import { ZodSchema } from "zod"
import { validation, ValidationError } from "./validation"

export class JsonParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "JsonParseError"
  }
}

export interface ErrorReject {
  message: string
  type: "error" | "info" | "warning"
  name: string
}

interface OptionsGetDefaultValue<T> {
  schema: ZodSchema
  key: string
  parse?: boolean
  onSuccess?: (payload: T) => void
  onError?: (error: ErrorReject) => void
}

export const getDefaultValue = <T>(options: OptionsGetDefaultValue<T>) => {
  const {
    key,
    schema,
    parse,
    onError,
    onSuccess,
  } = options

  try {
    const readData = localStorage.getItem(key)
    if (readData === null) throw new Error("infoNotFound")

    let data = readData
    try {
      if (parse) data = JSON.parse(readData ?? "{}")
    } catch (error) {
      throw new JsonParseError("errorParsed")
    }

    let validatedData
    try {
      validatedData = validation(schema, data)
    } catch (error) {
      throw new ValidationError("errorValidate", (error as ValidationError).cause)
    }

    if (onSuccess) onSuccess(validatedData)

    return validatedData
  } catch (error) {
    const result: ErrorReject = { message: "Unknown error", type: "error", name: key }

    if (error instanceof ValidationError) {
      result.message = error.message
      result.type = "warning"
    } else if (error instanceof JsonParseError) {
      result.message = error.message
      result.type = "error"
    } else if (error instanceof Error) {
      result.message = error.message
      result.type = "info"
    }

    onError?.(result)
  }
}
