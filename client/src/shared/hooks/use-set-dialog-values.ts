import { DeepPartial } from "react-hook-form"
import { useEffect } from "react"

interface Options<T> {
  data: T
  defaults: DeepPartial<T>
  setData?: ((data: T) => void) | Array<(data: T) => void>
  clearData?: ((data: DeepPartial<T>) => void) | Array<(data: DeepPartial<T>) => void>
  shouldHandle?: Array<unknown>
}

const applyFn = (
  callbacks?: ((data: any) => void) | Array<(data: any) => void>,
  args: unknown = null,
) => {
  if (Array.isArray(callbacks)) callbacks.map((fn) => fn(args))
  else callbacks?.(args)
}

export const useSetDialogValues = <T, >(options: Options<T>) => {
  const {
    clearData,
    setData,
    defaults,
    data,
    shouldHandle = [],
  } = options

  useEffect(() => {
    if (data) applyFn(setData, data)

    return () => applyFn(clearData, defaults)
  }, [options.data, ...shouldHandle])

  return {
    apply: (data: DeepPartial<T>) => applyFn(setData, data),
    clear: () => applyFn(clearData, defaults),
  }
}