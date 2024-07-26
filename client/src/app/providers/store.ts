import { configureStore } from "@reduxjs/toolkit"
import settingsSlice from "features/settings/model/settings-slice"
import sidebarSlice from "widgets/Sidebar/model/sidebar-slice"

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    sidebar: sidebarSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
