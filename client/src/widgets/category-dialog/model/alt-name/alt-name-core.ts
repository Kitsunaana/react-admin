import { AltName, Locale } from "../../domain/alt-name"

export const getUsedCodeLocales = (altNames: AltName[]) => (
  altNames.map((altName) => altName.locale.code)
)

export const filterByUnusedLocales = (locale: Locale, usedCodeLocales: string[]) => (
  !usedCodeLocales.includes(locale.code)
)

export const filterLocales = (locales: Locale[], filter: (locale: Locale) => boolean) => (
  locales.filter(filter)
)

export const getIsDisabledTranslate = (caption: string) => caption.length < 3