import { makeAutoObservable } from "mobx"
import { getDefaultValue } from "shared/lib/local-storage"
import { KeysSettingsFields, KeysSettingsRows, Action } from "../domain/types"
import { initialSettingsFields, initialSettingsRows } from "../domain/const"
import { settingFieldsSchema, settingsRowsSchema } from "../domain/schemas"

export class CategorySettingsStore {
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

  handleChangeSettingsFields = (name: KeysSettingsFields, value: boolean) => {
    this.settingsFields[name] = value
    localStorage.setItem("settingsFields", JSON.stringify(this.settingsFields))
  }

  handleChangeSettingsRows = (name: KeysSettingsRows, value: Action) => {
    this.settingsRows[name] = value
    localStorage.setItem("settingsRows", JSON.stringify(this.settingsRows))
  }
}

export const createCategorySettingsStore = () => new CategorySettingsStore()

export const categorySettingsStore = createCategorySettingsStore()
