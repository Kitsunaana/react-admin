import { useState } from "react"
import { useStartRemove } from "./use-start-remove"
import { RemoveStore } from "../../model/remove-store"

export const RemoveModal = () => {
  const startRemove = useStartRemove()

  useState(new RemoveStore(startRemove))

  return null
}
