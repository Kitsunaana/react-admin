import { LangContext, useLang } from "shared/context/lang"
import { useContextMenu } from "shared/hooks/context-menu/use-context-menu"
import { Image, Media } from "shared/types/new_types/types"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { Position } from "shared/ui/position-counter"
import { Text } from "shared/ui/text"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { useNavigateGoods } from "../../model/use-navigate-goods"
import { ContextMenu } from "../context-menu"
import { CustomRowItem } from "./components"

interface LayoutProps {
  id: string
  caption: string
  images?: Media[]
  order: number | null
  isLoading: boolean
  onOpenGallery: (data: {
    index: number,
    images: (Media | Image)[]
  }) => void
  onRemoveCategory: (categoryId: (string | null)) => Promise<void>
  onChangeOrder: (payload: { id: string, order: number }) => void
  onOpenEditDialog: (id: string) => void
}

export const Layout = (props: LayoutProps) => {
  const {
    id,
    caption,
    images,
    order,
    isLoading,
    onOpenGallery,
    onChangeOrder,
    onRemoveCategory,
    onOpenEditDialog,
  } = props

  const langBase = useLang()
  const menu = useContextMenu()
  const navigate = useNavigateGoods(caption)

  const handleOnEdit = () => {
    menu.close()
    onOpenEditDialog(id)
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
          <ContextMenu
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
          onUpdate={onChangeOrder}
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
