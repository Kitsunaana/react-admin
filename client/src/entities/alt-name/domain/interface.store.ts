import { DataTranslation, FetchTranslateData } from "entities/alt-name/domain/types"
import { Common } from "shared/types/common"

export interface AltNamesStoreImpl {
  isLoading: boolean
  altNames: Common.AltNameCreate[]
  selectedLocale: Common.Locale | null

  get filteredItems(): Common.AltNameCreate[]

  create: (data: Common.AltNameBase & { id: string }) => void
  edit: (data: Common.AltNameCreate) => void
  remove: (id: number | string) => void
  getFreeLocale: (locales: Common.Locale[]) => Common.Locale[]
  setIsLoading: (isLoading: boolean) => void
  translate: (category: DataTranslation, locales: Common.Locale[]) => void
  addTranslateAltNames: (translates: FetchTranslateData) => void
  exclude: (locales: Common.Locale[], nonExclude: Common.Locale | null) => (
    ((Common.Locale & { disabled: boolean }) | Common.Locale)[]
    )
  getData: () => { altNames: Common.AltNameCreate[] }
  setAltNames: (altNames: (Common.AltName | Common.AltNameCreate)[]) => void
}
