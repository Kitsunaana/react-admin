import { Vertical } from "shared/ui/divider"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { Position } from "shared/ui/position-counter"
import { useNavigateGoods } from "shared/hooks/use-navigate-goods"
import { UseMutationOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { Box } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { RowItem } from "shared/ui/row-item"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { CategoryContextMenu } from "entities/category/ui/context-menu"
import styled from "styled-components"
import { LangContext, useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"
import { Common } from "shared/types/common"

interface CategoryRowProps {
  id: number
  caption: string
  images?: Common.Media[]
  order: number | null
}

export const updatePositionOptions = (id: number): UseMutationOptions<any, any, number> => ({
  mutationKey: ["categories", id],
  mutationFn: (order: number) => $axios.patch("/categories/order", { order, id }),
})

const CustomRowItem = styled(RowItem)`
  margin-bottom: 0px;
  min-height: 48px;
  border-radius: 0px;
  gap: 10px;
    
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
    
  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`

export const CategoryRow = (props: CategoryRowProps) => {
  const {
    caption, id, images, order,
  } = props

  const deleteStore = useDeleteDialogStore()
  const editStore = useEditDialogStore()
  const langBase = useLang()
  const navigate = useNavigateGoods(caption)
  const menu = useContextMenu()

  const handleOnEdit = () => {
    editStore.openDialog(id)
    menu.close()
  }

  const handleOnDelete = () => {
    deleteStore.openDialog(id, { caption })
    menu.close()
  }

  return (
    <CustomRowItem
      bgColor={menu.isOpen ? "primary" : undefined}
      onContextMenu={menu.open}
    >
      <Text caption={caption} />
      {menu.isOpen && (
        <LangContext lang={`${langBase}.menuActions`}>
          <CategoryContextMenu
            id={id}
            ref={menu.ref}
            onGoodsCategory={navigate}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
          />
        </LangContext>
      )}
      <Box flex row ai sx={{ height: 1 }}>
        <TooltipImageView images={images} />
        <Vertical />
        <IconButton
          name="goods"
          fontSize={20}
          onClick={navigate}
          help={{ title: <Text onlyText name="goodsCategoryCount" /> }}
          badge={{
            badgeContent: 9,
            color: "warning",
          }}
        />
        <Vertical />
        <Position
          order={order}
          id={id}
          updatePositionOptions={updatePositionOptions}
        />
        <Vertical />
        <IconButton
          name="stopList"
          help={{ title: <Text onlyText name="addStopList" /> }}
          fontSize={20}
        />
        <Vertical />
        <IconButton
          help={{ title: <Text onlyText name="actions" /> }}
          sx={{ p: 0.25, borderRadius: 1 }}
          color="primary"
          name="actions"
          onClick={menu.open}
        />
      </Box>
    </CustomRowItem>
  )
}
