import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/lang"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { useNavigateGoods } from "shared/hooks/use-navigate-goods"
import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { Position } from "shared/ui/position-counter"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import styled from "styled-components"
import { CategoryContextMenu } from "./context-menu"

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

interface CategoryRowProps {
  id: number
  caption: string
  images?: Common.Media[]
  order: number | null
  isLoading: boolean
  onOpenGallery: (data: { index: number, images: (Common.Media | Common.Image)[] }) => void
  onRemoveCategory: (categoryId: (number | null)) => Promise<void>
  onUpdatePosition: (payload: { id: number, order: number }) => void
}

export const CategoryRow = (props: CategoryRowProps) => {
  const {
    id,
    caption,
    images,
    order,
    isLoading,
    onOpenGallery,
    onUpdatePosition,
    onRemoveCategory,
  } = props

  const langBase = useLang()
  const menu = useContextMenu()
  const editStore = useEditDialogStore()
  const navigate = useNavigateGoods(caption)

  const handleOnEdit = () => {
    menu.close()
    editStore.openDialog(id)
  }

  const handleOnDelete = async () => {
    menu.close()
    await onRemoveCategory(id)
  }

  return (
    <CustomRowItem
      bgColor={menu.isOpen && "primary"}
      onContextMenu={menu.open}
    >
      <Text caption={caption} />
      {menu.isOpen && (
        <LangContext lang={`${langBase}.menuActions`}>
          <CategoryContextMenu
            onClick={() => menu.close()}
            id={id}
            ref={menu.ref}
            onGoodsCategory={navigate}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
          />
        </LangContext>
      )}
      <Box flex row ai sx={{ height: 1 }}>
        <TooltipImageView
          onOpenGallery={onOpenGallery}
          images={images}
        />
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
          onUpdate={onUpdatePosition}
          isLoading={isLoading}
          order={order}
          id={id}
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
