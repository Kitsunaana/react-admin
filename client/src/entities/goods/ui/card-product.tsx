import { Accordion, AccordionV2 } from "shared/ui/accordion"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { Tag } from "shared/ui/tag"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { GoodContextMenu } from "entities/goods/ui/context-menu"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { Icon } from "shared/ui/icon"
import { CardProductDetails } from "./card-product-details"
import { AdditionalButton } from "./additional-button"
import { StopListButton } from "./stop-list-button"

interface CardProductProps {
  caption: string
  category: string
  id: number
}

export const CardProduct = (props: CardProductProps) => {
  const { caption, category, id } = props

  const menu = useContextMenu()
  const deleteStore = useDeleteDialogStore()
  const editStore = useEditDialogStore()

  const handleOnEdit = () => {
    editStore.openDialog(id)
    menu.close()
  }

  const handleOnDelete = () => {
    deleteStore.openDialog(id, { caption })
    menu.close()
  }

  return (
    <AccordionV2
      onOpenContextMenu={menu.open}
      summary={(
        <Box flex row jc_sp ai sx={{ width: 1 }}>
          <Box flex>
            <div>{caption}</div>
            <div>{category}</div>
          </Box>
          <Box flex ai row sx={{ height: 1 }} onClick={(event) => event.stopPropagation()}>
            {/* {tags} */}
            <Tag caption="isHot" />
            <Tag caption="isNow" />
            {/* {actions} */}
            <Vertical sx={{ mx: 0.75 }} />
            <IconButton
              name="expand"
              sx={{
                p: 0.5,
                transition: ".3s",
              }}
            />
          </Box>
        </Box>
    )}
    >
      {menu.isOpen && (
        <GoodContextMenu
          id={id}
          ref={menu.ref}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
      )}
    </AccordionV2>
  )
}
