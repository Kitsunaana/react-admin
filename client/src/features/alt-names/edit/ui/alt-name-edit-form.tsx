import { useFormContext } from "react-hook-form"
import { Box } from "shared/ui/box"
import { DescriptionInput } from "shared/ui/description"
import { observer } from "mobx-react-lite"
import { AltNameInputLocale } from "features/alt-names/edit/ui/forms/alt-name-input-locale"
import { AltNameInputCaption } from "features/alt-names/edit/ui/forms/alt-name-input-caption"
import { useStores } from "features/categories/model/context"
import { useLocales } from "entities/alt-name"

export const CreateEditForm = observer(() => {
  const { altNames } = useStores()
  const { locales } = useLocales()
  const methods = useFormContext()

  const excludedLocales = altNames
    .exclude(locales || [], methods.getValues("locale"))


  return (
    <Box flex gap sx={{ height: 1, pt: 1 }}>
      <AltNameInputLocale options={excludedLocales} />
      <AltNameInputCaption />
      <DescriptionInput />
    </Box>
  )
})
