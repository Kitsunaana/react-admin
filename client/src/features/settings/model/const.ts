import { Messages, Settings } from "./types"

export const defaultLanguage = "ru"
export const defaultTheme = "system"
export const defaltIconSettings = {
  weightIcon: 200,
  fillIcon: 0,
}

export const messages: Record<Settings, Messages> = {
  icon: {
    errorMessage: "Не правильно указаны настройки иконок в localStorage",
    notFound: "Настройки для иконок не найдены, используется параметры по умолчанию",
  },
  language: {
    errorMessage: "Не правильно указан ключ для переводов в localStorage",
  },
  theme: {
    errorMessage: "Не правильно указан ключ для темы в localStorage",
  },
}

export const DEFAULT_SETTINGS = {
  language: defaultLanguage,
  theme: defaultTheme,
  iconSettings: defaltIconSettings,
}
