import { isBoolean, sleep } from "shared/lib/utils"
import { AltNameApi } from "../../queries/alt-name/use-get-all-translate-alt-name"
import { altNameApi } from "../../alt-name-api"

export const getApiTranslateAltName = ({
  fake,
}: {
  fake?: boolean | {
    error?: boolean
    delay?: number
  }
}): AltNameApi => {
  if (fake === undefined) return altNameApi

  const defaultDelay = 500
  const defaultError = false

  const calcDelay = isBoolean(fake) ? defaultDelay : fake.delay ?? defaultDelay
  const calcError = isBoolean(fake) ? defaultError : fake.error

  return {
    translate: (locale, category) => (
      sleep(calcDelay)
        .then(() => {
          if (calcError) throw new Error("fake translate error")

          return {
            locale,
            data: {
              trans: {
                caption: `caption test translate ${category.caption} ${locale.altName}`,
                description: `description test translate ${category.description} ${locale.altName}`,
              },
            },
          }
        })
    ),
  }
}
