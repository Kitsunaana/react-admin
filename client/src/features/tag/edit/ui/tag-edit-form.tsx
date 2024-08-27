import { useFormContext } from "react-hook-form"
import { useTags } from "entities/tag/queries/use-tags"
import { Box } from "shared/ui/box"
import { Tag } from "entities/tag"
import React, { useEffect } from "react"
import { TagInputCaption } from "./forms/tag-input-caption"
import { TagInputIcon } from "./forms/tag-input-icon"
import { TagInputColor } from "./forms/tag-input-color"

export const TagEditForm = () => {
  const { getValues, watch, trigger } = useFormContext()

  const caption = watch("tag.caption") ?? getValues("tag.caption")
  const icon = watch("icon") ?? getValues("icon")
  const tagColor = watch("tagColor") ?? getValues("tagColor")

  const { tagsData, tagsIsLoading } = useTags()

  useEffect(() => { trigger() }, [tagsIsLoading])

  if (tagsIsLoading) return <Box>Loading</Box>

  return (
    <Box flex ai gap grow sx={{ p: 1 }}>
      <Box flex row jc>
        <Tag caption={caption} icon={icon} color={tagColor} />
      </Box>

      <TagInputCaption options={tagsData} />

      <Box flex row gap sx={{ width: 1 }}>
        <TagInputIcon />
        <TagInputColor />
      </Box>
    </Box>
  )
}
