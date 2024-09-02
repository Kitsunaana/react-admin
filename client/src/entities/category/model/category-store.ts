import { MobxQuery } from "shared/lib/mobx-react-query"
import { z } from "zod"
import { $axios } from "shared/config/axios"
import { validation } from "shared/lib/validation"
import { queryClient } from "app/providers/query-client"
import { makeAutoObservable } from "mobx"
import { createUrlStore } from "shared/stores/url-store"
import { categoriesSchema } from "features/categories/model/schemas"

export const categoriesUrlStore = createUrlStore()

class CategoriesStore {
  categoriesQuery = new MobxQuery<z.infer<typeof categoriesSchema>>(
    () => ({
      queryKey: ["categories", categoriesUrlStore.searchParams],
      queryFn: () => $axios.get(`/categories?${categoriesUrlStore.searchParams}`)
        .then(({ data }) => validation(categoriesSchema, data)),
    }),
    queryClient,
  )

  constructor() {
    makeAutoObservable(this)
  }
}

export const categoriesStore = new CategoriesStore()
