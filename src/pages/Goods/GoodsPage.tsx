import {
  IconButton, Menu, MenuItem,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import React, {
  MouseEvent,
} from "react"
import { Text } from "shared/ui/Text"

import { Divider } from "shared/ui/Divider"
import { CardProduct } from "entities/CardProduct"
import { dispatch } from "shared/lib/event"
import { Backdrop } from "shared/ui/Backdrop"
import { Bottom } from "pages/Goods/ui/Bottom"
import { Header } from "pages/Goods/ui/Header"
import { Table } from "shared/ui/Table"

export const ActionButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)

    dispatch("backdrop", { isActive: open })
  }
  const handleClose = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()

    setAnchorEl(null)

    dispatch("backdrop", { isActive: open })
  }

  const menu = [
    { type: "action", caption: "Редактировать", icon: "edit" },
    { type: "divider" },
    { type: "action", caption: "Дополнения", icon: "additional" },
    { type: "action", caption: "Сделать копию товара", icon: "copy" },
    { type: "action", caption: "Добавить в стоп-лист", icon: "stopList" },
    { type: "divider" },
    { type: "action", caption: "Удалить", icon: "delete" },
  ]

  return (
    <div>
      <IconButton
        sx={{ p: 0.25, borderRadius: 1 }}
        onClick={(event) => {
          event.stopPropagation()

          handleClick(event)
        }}
      >
        <Icon
          sx={{ fontSize: 28, color: ({ palette }) => palette.primary.main }}
          name="actions"
        />
      </IconButton>
      <Menu
        sx={{
          "& .MuiList-root": {
            mx: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menu.map((action, index) => {
          if (action.type === "divider") return <Divider key={index} />

          if (action.type === "action") {
            return (
              <MenuItem
                key={index}
                onClick={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: 1,
                }}
              >
                <Text caption={action.caption} />
                <Icon name={action.icon ?? ""} sx={{ color: ({ palette }) => palette.primary.main, fontSize: 20 }} />
              </MenuItem>
            )
          }
        })}
      </Menu>
    </div>
  )
}

const GoodsPage = () => (
  <>
    <Table
      header={<Header />}
      content={new Array(20).fill(20).map((_, index) => index).map((item, index) => (
        <CardProduct key={index} />
      ))}
      bottom={<Bottom />}
    />
    <Backdrop />
  </>
)

/* return (
    <Box flex jc_sp sx={{ height: 1 }}>
      <Box flex gap sx={{ p: 1 }}>
        <Box flex row ai gap>
          <Input
            {...register("search")}
            sx={{ flexGrow: 1 }}
            size="small"
            label="Поиск"
          />
          <Box flex row>
            {[1, 2, 3].map((icon) => (
              <IconButton key={icon} sx={{ p: 0.5 }}>
                <Icon name="" sx={{ fontSize: 20 }} />
              </IconButton>
            ))}
          </Box>
        </Box>
        <Box ai flex row gap>
          <Select
            clear
            value={getValues("filterByCategory")}
            setValue={setValue}
            inputProps={{ size: "small", label: "Категория" }}
            options={[{ id: 1, value: "option1" }, { id: 2, value: "option2" }]}
            {...register("filterByCategory")}
          />

          <Select
            clear
            value={getValues("filterByTypeGood")}
            setValue={setValue}
            {...register("filterByTypeGood")}
            inputProps={{ size: "small", label: "Тип товара" }}
            options={
              [
                {
                  id: 1,
                  value: "option1",
                  icon: "consumable",
                },
                {
                  id: 2,
                  value: "option2",
                  icon: "typeGood",
                  default: true,
                },
              ]
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: 1,
          mx: 1,
          borderRadius: 1,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {new Array(20).fill(20).map((_, index) => index).map((item, index) => (
          <CardProduct key={index} />
        ))}
      </Box>
      <Box
        flex
        row
        jc_sp
        ai
        sx={{
          p: 1,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Box />
        <Box flex ai row gap>
          <Text langBase="table.bottom" name="count" />
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: ({ palette }) => alpha(palette.grey["700"], 0.5),
            }}
          >
            79
          </Box>
          <Pagination
            count={3}
            variant="outlined"
            shape="rounded"
            onChange={(event, page) => {
              console.log(page)
            }}
          />
        </Box>
      </Box>

      <Backdrop open={backdropActive} />
    </Box>
  ) */

export default GoodsPage
