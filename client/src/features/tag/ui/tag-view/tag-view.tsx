import { FormData } from "features/tag/view-model/use-tag-form"
import { useWatch } from "react-hook-form"
import { TagView as BaseTagView } from "entities/tag"
import { TagViewContainer } from "./styles"

export const TagView = ({
  defaultValue,
}: {
  defaultValue: FormData
}) => {
  const caption = useWatch({ name: "caption", defaultValue: defaultValue.caption })
  const color = useWatch({ name: "color", defaultValue: defaultValue.color })
  const icon = useWatch({ name: "icon", defaultValue: defaultValue.icon })

  return (
    <TagViewContainer>
      <BaseTagView
        caption={caption || "untitled"}
        color={color}
        icon={icon}
      />
    </TagViewContainer>
  )
}
