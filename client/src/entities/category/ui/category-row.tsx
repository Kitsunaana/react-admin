import { Box, BoxProps } from "shared/ui/box"
import {
  alpha, Badge, MenuItem, Theme,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { MIKU } from "shared/config/constants"
import { Divider, Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/icon-button"
import { Position } from "shared/ui/position-counter"
import { ActionButton } from "shared/ui/action-button"
import React, {
  memo, useCallback, useRef, useState,
} from "react"
import { Icon } from "shared/ui/icon"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { $axios } from "shared/config/axios"
import { queryClient } from "app/providers/query-client"
import { z } from "zod"
import { categoriesSchema, categorySchema } from "features/categories/create/model/schemas"
import { useContextMenu } from "shared/hooks/use-context-menu"

interface CategoryItemProps {
  caption: string
  id: number
}

type VariantTheme = "warning" | "danger" | "info" | "success" | "primary" | "secondary"

interface MenuActionItemProps {
  onClick?: () => void
  caption: string
  icon: string
  variantText?: VariantTheme
  variantIcon?: VariantTheme
}

export const MenuActionItem = memo((props: MenuActionItemProps) => {
  const {
    caption, variantIcon, variantText, icon, onClick,
  } = props

  return (
    <MenuItem
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        borderRadius: 1,
        mx: 1,
      }}
    >
      <Text
        caption={caption}
        sx={{
          color: ({ palette }) => (variantText ? palette[variantText].main : null),
        }}
      />
      <Icon
        name={icon}
        sx={{
          color: ({ palette }) => (variantIcon ? palette[variantIcon].main : null),
          fontSize: 20,
        }}
      />
    </MenuItem>
  )
})

export const DeleteAction = ({ id }: { id: number }) => {
  const {
    isSuccess, isPending, isError, mutate,
  } = useMutation({
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
    <MenuActionItem
      onClick={onClick}
      caption="Удалить"
      icon="delete"
      variantIcon="warning"
    />
  )
}

const menu = [
  {
    id: 1, type: "action", caption: "Редактировать", icon: "edit", variantIcon: "primary",
  },
  { id: 2, type: "divider" },
  {
    id: 3, type: "action", caption: "Товары категории", icon: "goods",
  },
  {
    id: 4, type: "action", caption: "Дополнения", icon: "additional",
  },
  {
    id: 5,
    type: "action",
    caption: "Добавить в стоп-лист",
    icon: "stopList",
    variantText: "warning",
  },
  { id: 6, type: "divider" },
  {
    id: 7, type: "action", caption: "Удалить", icon: "delete", variantIcon: "warning",
  },
  { id: 8, type: "divider" },
]

export const CategoryItem = memo((props: CategoryItemProps) => {
  const { caption, id } = props

  const [menuItems, setMenuItems] = useState([])
  const menu = useContextMenu(menuItems)
  // console.log(menu)

  return (
    <Box
      onContextMenu={menu.open as any}
      flex
      ai
      row
      jc_sp
      sx={{
        px: 1,
        height: 48,
        border: ({ palette }) => `1px solid ${alpha(palette.grey["600"], 0.75)}`,
        "&:last-child": {
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        },
        "&:first-of-type": {
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        },
      }}
    >
      {menu.isOpen && (
        <div
          style={{
            zIndex: 10,
            position: "absolute",
            backgroundColor: "red",
            padding: 8,
            display: "flex",
            flexDirection: "column",
          }}
          ref={menu.ref}
        >
          <div>hellohellohellohello</div>
          <div>hellohellohellohello</div>
          <div>hellohellohellohello</div>
          <div>hellohellohellohello</div>
          <div>hellohellohellohello</div>
          <div>hellohellohellohello</div>
        </div>
      )}
      <Text caption={caption} />
      <Box row flex ai>
        <TooltipImageView images={MIKU} />
        <Vertical />
        <Badge
          badgeContent={9}
          color="warning"
          sx={{
            "& .MuiBadge-badge": {
              px: 0.25,
              top: 3,
              right: 3,
              zIndex: 0,
            },
          }}
        >
          <IconButton name="goods" fontSize={20} />
        </Badge>
        <Vertical />
        <Position count={17345} />
        <Vertical />
        <IconButton name="stopList" fontSize={20} />
        <Vertical />
        <IconButton name="stopList" fontSize={20} onClick={menu.open as any} />
        {/* <ActionButton
          id={id}
          renderActions={(onClose) => menu.map((action) => {
            if (action.type === "divider") return <Divider sx={{ py: 0 }} />

            return (
              <MenuActionItem
                key={action.id}
                caption={action.caption as string}
                icon={action.icon as string}
                variantIcon={action.variantIcon as VariantTheme}
                variantText={action.variantText as VariantTheme}
              />
            )
          })}
          renderActions={(onClose) => (
            <Box>
              <DeleteAction id={id} />
              <Divider sx={{ py: 0 }} />
            </Box>
          )}
        /> */}
      </Box>
    </Box>
  )
})
