import { DeepPartial } from "react-hook-form"
import { useEffect } from "react"

type NonUndefined<T> = T extends undefined ? never : T;

export type SetData<T> = ((data: NonUndefined<T>) => void) | Array<(data: NonUndefined<T>) => void>
export type ClearData<U> = ((data: DeepPartial<U>) => void) | Array<(data: DeepPartial<U>) => void>

interface Options<T, U> {
  data: T
  defaults?: DeepPartial<U>
  setData?: SetData<T>
  clearData?: ClearData<U>
  shouldHandle?: Array<unknown>
}

const applyFn = (
  callbacks?: ((data: any) => void) | Array<(data: any) => void>,
  args: unknown = null,
) => {
  if (Array.isArray(callbacks)) callbacks.map((fn) => fn(args))
  else callbacks?.(args)
}

export const useSetDialogValues = <T, U = T>(options: Options<T, U>) => {
  const {
    clearData,
    setData,
    defaults,
    data,
    shouldHandle = [],
  } = options

  useEffect(() => {
    if (data) applyFn(setData, data as NonUndefined<T>)

    return () => defaults && applyFn(clearData, defaults as NonUndefined<U>)
  }, [options.data, ...shouldHandle])

  return {
    apply: <TR, TU>(options: Options<TR, TU>) => {
      const newSetData = options.setData === undefined
        ? setData
        : options.setData

      return applyFn(newSetData, options.data)
    },
    clear: () => applyFn(clearData, defaults),
  }
}

export type UseSetValuesReturn = ReturnType<typeof useSetDialogValues>
export type UseSetValuesApply = UseSetValuesReturn["apply"]
export type UseSetValuesClear = UseSetValuesReturn["clear"]
