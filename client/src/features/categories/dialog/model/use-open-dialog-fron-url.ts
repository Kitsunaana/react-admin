import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { isNumber } from "shared/lib/utils"

export const useOpenDialogFromUrl = () => {
  const key = "category-edit"

  const dialogStore = useEditDialogStore()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const readId = searchParams.get(key)
    if (readId === null) return

    const transformId = parseInt(readId, 10)

    if (isNumber(transformId)) dialogStore.openDialog(transformId)
  }, [])

  const handleClearParams = () => {
    searchParams.delete(key)

    setSearchParams((prev) => {
      prev.delete(key)
      return prev
    })
  }

  return { handleClearParams }
}
