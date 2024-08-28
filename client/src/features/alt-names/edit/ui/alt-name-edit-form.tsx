import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Box } from "shared/ui/box"
import * as React from "react"
import { DescriptionInput } from "shared/ui/description"
import { observer } from "mobx-react-lite"
import { useGetLocales } from "entities/alt-name/queries/use-get-locales"
import { AltNameInputLocale } from "features/alt-names/edit/ui/forms/alt-name-input-locale"
import { AltNameInputCaption } from "features/alt-names/edit/ui/forms/alt-name-input-caption"
import { useStores } from "features/categories/create-and-edit/model/context"

export const CreateEditForm = observer(() => {
  const { altNames } = useStores()
  const methods = useFormContext()

  const { localesData } = useGetLocales()

  useEffect(() => { methods.trigger() }, [])

  const excludedLocales = altNames
    .exclude(localesData || [], methods.getValues("locale"))

  return (
    <Box flex gap sx={{ p: 1, height: 1 }}>
      <AltNameInputLocale options={excludedLocales} />
      <AltNameInputCaption />
      <DescriptionInput />
    </Box>
  )
})
