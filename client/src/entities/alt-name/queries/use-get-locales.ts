import { validation } from "shared/lib/validation"
import { MobxQuery } from "shared/lib/mobx-react-query"
import { queryClient } from "app/providers/query-client"
import { makeAutoObservable } from "mobx"
import { altNameApi } from "../api/alt-name-api"
import { localesSchema } from "../model/schemas"

export class LocaleStore {
  localeQuery = new MobxQuery(
    () => ({
      queryKey: ["locales"],
      queryFn: altNameApi.getAll,
      placeholderData: [],
    }),
    queryClient,
  )

  constructor() { makeAutoObservable(this) }

  get locale() { return validation(localesSchema, this.localeQuery.data) }
  get isLoading() { return this.localeQuery.result.isLoading }
}

export const createLocaleStore = () => new LocaleStore()
export const localeStore = createLocaleStore()
