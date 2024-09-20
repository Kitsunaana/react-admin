import { useFormContext } from "react-hook-form"
import { Box } from "shared/ui/box"
import * as React from "react"
import { DescriptionInput } from "shared/ui/description"
import { observer } from "mobx-react-lite"
import { localeStore } from "entities/alt-name/queries/use-get-locales"
import { AltNameInputLocale } from "features/alt-names/edit/ui/forms/alt-name-input-locale"
import { AltNameInputCaption } from "features/alt-names/edit/ui/forms/alt-name-input-caption"
import { useStores } from "features/categories/model/context"
import { useLang } from "shared/context/lang"

export const CreateEditForm = observer(() => {
  const { altNames } = useStores()
  const methods = useFormContext()
  const langBase = useLang()

  const excludedLocales = altNames
    .exclude(localeStore.locale || [], methods.getValues("locale"))

  return (
    <Box flex gap sx={{ height: 1, pt: 1 }}>
      <AltNameInputLocale options={excludedLocales} />
      <AltNameInputCaption />
      <DescriptionInput langBase={`${langBase}.forms`} />
    </Box>
  )
})
