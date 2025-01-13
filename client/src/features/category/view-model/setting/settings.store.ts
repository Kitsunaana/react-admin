import { makeAutoObservable } from "mobx"
import { getDefaultValue } from "shared/lib/local-storage"
import { initialSettingsFields, initialSettingsRows } from "../const"
import {
  PasteAction,
  KeysSettingsFields,
  KeysSettingsRows,
  settingFieldsSchema,
  settingsRowsSchema,
} from "./settings-types"

export class SettingsStore {
  public settingsFields: KeysSettingsFields = initialSettingsFields
  public settingsRows: KeysSettingsRows = initialSettingsRows

  public constructor() {
    getDefaultValue<KeysSettingsRows>({
      key: "settingsRows",
      parse: true,
      schema: settingsRowsSchema,
      onSuccess: (settings) => {
        this.settingsRows = settings
      },
    })

    getDefaultValue<KeysSettingsFields>({
      key: "settingsFields",
      parse: true,
      schema: settingFieldsSchema,
      onSuccess: (settings) => {
        this.settingsFields = settings
      },
    })

    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get settings() {
    return {
      ...this.settingsFields,
      ...this.settingsRows,
    }
  }

  public changeFields = (name: keyof KeysSettingsFields, value: boolean) => {
    this.settingsFields[name] = value
    localStorage.setItem("settingsFields", JSON.stringify(this.settingsFields))
  }

  public changeRows = (name: keyof KeysSettingsRows, value: PasteAction) => {
    this.settingsRows[name] = value
    localStorage.setItem("settingsRows", JSON.stringify(this.settingsRows))
  }
}
