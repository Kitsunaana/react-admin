import { Text } from "shared/ui/text"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { IconButton } from "shared/ui/buttons/icon-button"
import { BackButton } from "shared/ui/buttons/back-button"
import { useCategoryStartCreate } from "features/category"

export const Actions = ({ onRefetch }: { onRefetch: () => void }) => {
  const categoryStartCreate = useCategoryStartCreate()

  return (
    <>
      <RefetchButton onRefetch={onRefetch} />
      <IconButton
        name="add"
        color="success"
        fontSize={20}
        onClick={categoryStartCreate}
        help={{
          title: (
            <Text
              onlyText
              name="add"
            />
          ),
        }}
      />
      <BackButton />
    </>
  )
}
