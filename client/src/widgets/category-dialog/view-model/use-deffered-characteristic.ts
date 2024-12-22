import { startTransition, useEffect, useState } from "react"
import { CharacteristicExtended } from "../domain/characteristic"

export const useDeferredCharacteristics = (characteristics: CharacteristicExtended[]) => {
  const [items, setItems] = useState<CharacteristicExtended[]>([])
  useEffect(() => startTransition(() => setItems(characteristics)), [characteristics])

  return items
}
