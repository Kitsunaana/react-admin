import { useEffect, useRef } from "react"
import { ErrorReject } from "shared/lib/local-storage"
import { Id, toast } from "react-toastify"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { useSettings } from "features/settings"

export const useShowErrors = () => {
  const { settings, errors } = useSettings()
  const toasts = useRef<Record<string, Id>>({})

  useEffect(() => {
    const showToast = (error: ErrorReject) => (
      toast[error.type](
        (() => (
          <Text
            langBase="settings.notify"
            name={error.message}
            value={error.name}
            translateOptions={{
              components: {
                strong: <Mark />,
              },
            }}
          />
        )),
        {
          position: "bottom-right",
          hideProgressBar: true,
          autoClose: false,
        },
      )
    )

    setTimeout(() => {
      (Object
        .values(errors ?? {}) as ErrorReject[])
        .forEach((error) => {
          toasts.current[error.name] = showToast(error as ErrorReject)
        })
    }, 500)

    return () => (
      Object
        .values(toasts.current)
        .forEach((id) => toast.dismiss(id))
    )
  }, [errors, settings.theme])
}
