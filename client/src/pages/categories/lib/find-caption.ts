import { Common } from "shared/types/common"

export const findCaption = (altNames: Common.AltName[], defaultValue: string = ""): string => {
  const readLocale = localStorage.getItem("lngAdmin")

  const altName = altNames?.find((altName) => altName.locale.code === readLocale)

  return altName?.caption ?? defaultValue
}
