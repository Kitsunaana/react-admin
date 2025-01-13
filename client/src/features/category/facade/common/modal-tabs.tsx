import { useFormState } from "react-hook-form"
import { TabsContainer, useTabsWarning } from "shared/ui/tabs/tabs-container"
import { CategoryFields } from "entities/category"
import { useCategoryFormContext } from "../../view-model/form/use-category-form"
import { TABS } from "../../view-model/const"

export const ModalTabs = () => {
  const categoryForm = useCategoryFormContext()
  const formState = useFormState({ control: categoryForm.control })

  const tabsWithWarning = useTabsWarning<CategoryFields>({
    errors: formState.errors,
    getValues: categoryForm.getValues,
    requiredFields: ["caption"],
    tabs: TABS,
  })

  return (
    <TabsContainer
      tabs={TABS}
      tabsWithWarning={tabsWithWarning}
    />
  )
}
