import { validation, ValidationError } from "shared/lib/validation"
import { ZodSchema } from "zod"
import { Messages } from "../model/types"

export interface ErrorReject {
  message: string
  type: "error" | "info"
}

export const getDefaultValue = <T>(
  schema: ZodSchema,
  key: string,
  messages: Messages,
  parse: boolean = false,
): Promise<T> => (
    new Promise((resolve, reject) => {
      try {
        const readData = localStorage.getItem(key)
        if (readData === null) throw new Error(messages?.notFound ?? "notFound")

        let data = readData
        if (parse) data = JSON.parse(readData ?? "{}")

        const validatedData = validation(schema, data)

        resolve(validatedData)
      } catch (error) {
        const result: ErrorReject = { message: "Unknown error", type: "error" }

        if (error instanceof ValidationError) {
          result.message = messages?.errorMessage ?? error.message
          result.type = "error"
        } else if (error instanceof Error) {
          result.message = error.message
          result.type = "info"
        }

        reject(result)
      }
    })
  )
