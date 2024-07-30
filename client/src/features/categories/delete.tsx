import { useMutation } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { queryClient } from "app/providers/query-client"
import { categoriesSchema } from "features/categories/create/model/schemas"
import React, { useCallback } from "react"
import { ContextMenuItem } from "shared/ui/context-menu-item"

export const DeleteButton = ({ id }: { id: number }) => {
  const { mutate } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (categoryId: number) => $axios.delete(`categories/${categoryId}`)
      .then((response) => response.data),
    onSuccess: (categoryDeleted) => {
      queryClient.setQueryData(["categories"], (categories) => {
        const { error, data } = categoriesSchema.safeParse(categories)
        if (error) return

        return data.filter((category) => category.id !== categoryDeleted?.id)
      })
    },
  })
  const onClick = useCallback(() => mutate(id), [])

  return (
    <ContextMenuItem
      onClick={onClick}
      caption="Удалить"
      icon="delete"
      variantIcon="warning"
    />
  )
}
