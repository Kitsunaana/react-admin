import { useForm, UseFormReturn } from "react-hook-form"
import {
  createContext, ReactNode, useCallback, useMemo,
} from "react"
import { useStrictContext } from "shared/lib/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { exclude, include } from "shared/lib/utils"
import { CategoryFields, categoryFieldsSchema } from "entities/category"
import { useHistoryStore } from "../history/use-history-store"
import { useCategoryStore } from "../../model/category/use-category-store"
import { getCategoryDefaultFields } from "../const"
import { SettingsRecord } from "../setting/settings-types"
import { CategoryLocal } from "../../domain/category/types"

type UseCategoryFormMethods = Omit<UseFormReturn<CategoryFields>, "handleSubmit"> & {
  clear: () => void
  set: (category: CategoryLocal) => void
  setCopied: (category: CategoryLocal, settings: SettingsRecord) => void
  getFullValues: () => CategoryLocal
  defaultValue: CategoryFields
  submit: (onValid: (payload: CategoryLocal) => void) => Promise<void>
}

export const CategoryFormContext = createContext<UseCategoryFormMethods | null>(null)

export const CategoryFormProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm<CategoryFields>({
    defaultValues: getCategoryDefaultFields(),
    resolver: zodResolver(categoryFieldsSchema),
  })

  const getRows = useCategoryStore((store) => store.get)
  const setRows = useCategoryStore((store) => store.set)
  const setRowsCopied = useCategoryStore((store) => store.setCopied)

  const clearRows = useCategoryStore((store) => store.clear)
  const clearHistory = useHistoryStore((store) => store.reset)

  const clear = useCallback(() => {
    form.reset(getCategoryDefaultFields())

    clearRows()
    clearHistory()
  }, [form, clearRows, clearHistory])

  const set = useCallback((category: CategoryLocal) => {
    form.reset(category)
    setRows(category)
  }, [form, setRows])

  const setCopied = useCallback((category: CategoryLocal, settings: SettingsRecord) => {
    setRowsCopied(category, settings)

    const applySettings = (Object
      .entries(settings) as Array<[keyof CategoryFields, boolean]>)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    Object
      .entries(
        exclude(include(category, applySettings), ["activeImageId", "captionPosition"]),
      )
      .forEach(([key, value]) => {
        form.setValue(key as keyof CategoryFields, value)
      })
  }, [])

  const getFullValues = useCallback(() => ({
    ...form.getValues(),
    ...getRows(),
  }), [form, getRows])

  const submit = useCallback((onValid: (payload: CategoryLocal) => void) => (
    form.handleSubmit((data) => onValid({ ...data, ...getRows() }))()
  ), [])

  const methods = useMemo(() => ({
    defaultValue: getCategoryDefaultFields(),
    getFullValues,
    clear,
    set,
    setCopied,
    submit,
    ...form,
  }), [form, clear, set, getFullValues])

  return (
    <CategoryFormContext.Provider value={methods}>
      {children}
    </CategoryFormContext.Provider>
  )
}

export const useCategoryFormContext = <T = UseCategoryFormMethods, >(
  getState?: (state: UseCategoryFormMethods) => T,
) => {
  const store = useStrictContext(CategoryFormContext)

  if (getState) return getState(store)
  return store as T
}
