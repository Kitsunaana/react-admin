import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SidebarState { open: boolean }

interface SidebarToggleAction extends SidebarState {}

const readOpenPanel = localStorage.getItem("openPanel") ?? 1
const initialState: SidebarState = { open: !!(readOpenPanel === "0" ? 0 : 1) }

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<SidebarToggleAction>) => {
      state.open = action.payload.open

      localStorage.setItem("openPanel", `${+action.payload.open}`)
    },
  },
})

export const { toggle } = sidebarSlice.actions

export default sidebarSlice.reducer
