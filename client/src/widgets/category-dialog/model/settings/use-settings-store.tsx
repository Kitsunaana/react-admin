import { SettingsStore } from "./settings.store"

export const settingsStore = new SettingsStore()
export const useSettingsStore = <T = SettingsStore, >(getState?: (store: SettingsStore) => T): T => {
  const store = settingsStore

  if (getState) return getState(store)
  return store as T
}
