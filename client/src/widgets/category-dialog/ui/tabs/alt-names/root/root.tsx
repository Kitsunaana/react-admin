import { useGetAllLocales } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { TranslateBody } from "../../../../domain/alt-name"
import { useAltNameStore } from "../../../../model/alt-name/use-alt-name-store"
import { Layout } from "../layout/layout"
import { List } from "../list/list"
import { Actions } from "../actions"
import { useGetAllTranslateAltName } from "../../../../queries/alt-name/use-get-all-translate-alt-name"
import { getApiTranslateAltName } from "../../../../queries/alt-name/get-api-translate-alt-name"

export const Root = observer(() => {
  const locales = useGetAllLocales()
  const unusedLocales = useAltNameStore((store) => store.getUnusedLocales(locales.data))

  const translate = useGetAllTranslateAltName(getApiTranslateAltName({}))

  const handleTranslate = useCallback(
    (payload: TranslateBody) => translate.mutate({ payload, locales: unusedLocales }),
    [unusedLocales],
  )

  return (
    <Layout
      list={(
        <List
          showSkeletonCount={unusedLocales.length}
          isLoading={translate.isLoading}
        />
      )}
      actions={(
        <Actions
          isLoading={translate.isLoading}
          onTranslate={handleTranslate}
        />
      )}
    />
  )
})
