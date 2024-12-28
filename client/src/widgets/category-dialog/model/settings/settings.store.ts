import { makeAutoObservable } from "mobx"
import { getDefaultValue } from "shared/lib/local-storage"
import { initialSettingsFields, initialSettingsRows } from "../../domain/const"
import {
  PasteAction,
  KeysSettingsFields,
  KeysSettingsRows,
  settingFieldsSchema,
  settingsRowsSchema,
} from "../../domain/settings"

export class SettingsStore {
  settingsFields = initialSettingsFields
  settingsRows = initialSettingsRows

  constructor() {
    getDefaultValue<typeof this.settingsRows>({
      key: "settingsRows",
      schema: settingsRowsSchema,
      parse: true,
      onSuccess: (settings) => {
        this.settingsRows = settings
      },
    })

    getDefaultValue<typeof this.settingsFields>({
      key: "settingsFields",
      schema: settingFieldsSchema,
      parse: true,
      onSuccess: (settings) => {
        this.settingsFields = settings
      },
    })

    makeAutoObservable(this, {}, { autoBind: true })
  }

  get settings() {
    return {
      ...this.settingsFields,
      ...this.settingsRows,
    }
  }

  changeFields = (name: KeysSettingsFields, value: boolean) => {
    this.settingsFields[name] = value
    localStorage.setItem("settingsFields", JSON.stringify(this.settingsFields))
  }

  changeRows = (name: KeysSettingsRows, value: PasteAction) => {
    this.settingsRows[name] = value
    localStorage.setItem("settingsRows", JSON.stringify(this.settingsRows))
  }
}
