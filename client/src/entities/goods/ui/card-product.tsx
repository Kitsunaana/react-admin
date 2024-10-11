import { GoodContextMenu } from "entities/goods/ui/context-menu"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { AccordionV2 } from "shared/ui/accordion"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { Tag } from "shared/ui/tag"

interface CardProductProps {
  caption: string
  category: string
  id: number
}

export const CardProduct = (props: CardProductProps) => {
  const { caption, category, id } = props

  const menu = useContextMenu()
  const editStore = useEditDialogStore()

  const handleOnEdit = () => {
    editStore.openDialog(id)
    menu.close()
  }

  const handleOnDelete = () => {
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
