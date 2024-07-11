import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { menu, menuBottom } from "../constants"

export interface MenuItemBase {
  id: number
  name: string
  caption: string
  icon: string
}

export interface MenuItem extends MenuItemBase {
  disabled?: boolean
}

export interface MenuList extends MenuItemBase{
  sublist?: MenuItem[]
}

export interface SidebarState {
  listActive: number
  sublistActive: number | null
  listsExpanded: number[]
  menuBottom: MenuList[]
  menu: MenuList[]
}

const initialState: SidebarState = {
  listActive: 0,
  sublistActive: null,
  listsExpanded: [0],
  menuBottom,
  menu,
}

export interface SelectMenuItemAction {
  listId: number
  sublistId: number
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    selectMenuItem: (state: SidebarState, action: PayloadAction<SelectMenuItemAction>) => {
      state.listActive = action.payload.listId
      state.sublistActive = action.payload.sublistId

      const findMenuList = state.menu.find((list) => list.id === action.payload.listId)

      if (findMenuList !== undefined) {
        const isExpandable = findMenuList?.sublist?.length > 0

        if (isExpandable) state.listsExpanded.push(action.payload.listId)
      }
    },
  },
})

export const { selectMenuItem } = sidebarSlice.actions

export default sidebarSlice.reducer
