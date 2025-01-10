import { AltName, AltNameRow } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { EmptyList } from "shared/ui/empty-list"
import { nanoid } from "nanoid"
import { useCallback } from "react"
import { useAltNameStore } from "../../../../model/alt-name/use-alt-name-store"
import { startEditAltName, startRemoveAltName } from "../../../../model/alt-name/alt-name-events"
import { AltNamesContainer, AltNameLoader } from "./styles"
import { useSelectionItem } from "../../../../view-model/selection-item/use-selection-item"

export const List = observer(({
  isLoading,
  showSkeletonCount,
}: {
  isLoading: boolean
  showSkeletonCount: number
}) => {
  const count = useAltNameStore((store) => store.list.count)
  const isEmpty = useAltNameStore((store) => store.list.isEmpty)
  const altNames = useAltNameStore((store) => store.list.array)

  const getState = useAltNameStore((store) => store.getState)

  const selectionItem = useSelectionItem(count)

  const handleStartEditAltName = useCallback(
    (data: AltName) => startEditAltName(data, altNames),
    [altNames],
  )

  if (isEmpty && !isLoading) return <EmptyList />

  return (
    <AltNamesContainer>
      {altNames.map((altName, index) => (
        <AltNameRow
          key={altName.id}
          altName={altName}
          disabled={isLoading}
          state={getState(altName)}
          onEdit={handleStartEditAltName}
          onRemove={startRemoveAltName}
          active={selectionItem.isSelection(index)}
        />
      ))}

      {isLoading && (Array
        .from({ length: showSkeletonCount }, () => nanoid())
        .map((id) => <AltNameLoader key={id} variant="rectangular" />)
      )}
    </AltNamesContainer>
  )
})
