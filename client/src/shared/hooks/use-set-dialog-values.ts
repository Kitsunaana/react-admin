import { DeepPartial } from "react-hook-form"
import { useEffect } from "react"

interface Options<T, U> {
  data: T
  defaults?: DeepPartial<U>
  setData?: ((data: T) => void) | Array<(data: T) => void>
  clearData?: ((data: DeepPartial<U>) => void) | Array<(data: DeepPartial<U>) => void>
  shouldHandle?: Array<unknown>
}

const applyFn = (
  callbacks?: ((data: any) => void) | Array<(data: any) => void>,
  args: unknown = null,
) => {
  if (Array.isArray(callbacks)) callbacks.map((fn) => fn(args))
  else callbacks?.(args)
}

type NonUndefined<T> = T extends undefined ? never : T;

export const useSetDialogValues = <T, U extends T = T>(options: Options<T, U>) => {
  const {
    clearData,
    setData,
    defaults,
    data,
    shouldHandle = [],
  } = options

  useEffect(() => {
    if (data) applyFn(setData, data as NonUndefined<T>)

    return () => defaults && applyFn(clearData, defaults)
  }, [options.data, ...shouldHandle])

  return {
    apply: <T, U extends T = T>(options: Options<T, U>) => {
      const newSetData = options.setData === undefined
        ? setData
        : options.setData

      return applyFn(newSetData, options.data)
    },
    clear: () => applyFn(clearData, defaults),
  }
}
