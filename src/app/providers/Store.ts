import { configureStore } from "@reduxjs/toolkit"
import settingsSlice from "features/settings/model/SettingsSlice"

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
