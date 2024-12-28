import { AltName } from "shared/types/new_types/types"

export const findCaption = (altNames: AltName[], defaultValue: string = ""): string => {
  const readLocale = localStorage.getItem("lngAdmin")

  const altName = altNames?.find((altName) => altName.locale.code === readLocale)

  return altName?.caption ?? defaultValue
}
