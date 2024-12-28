import { AltNameRow } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { Skeleton } from "shared/ui/skeleton"
import { EmptyList } from "shared/ui/empty-list"
import { nanoid } from "nanoid"
import { useAltNameStore } from "../../../../model/alt-names/use-alt-name-store"
import { useAltNames } from "../../../../facade/use-alt-names"
import { AltNamesContainer } from "./styles"

export const List = observer(({
  isLoading,
  showSkeletonCount,
}: {
  isLoading: boolean
  showSkeletonCount: number
}) => {
  const altNames = useAltNames()
  const selected = useListKeyboardEvents()
  const isEmpty = useAltNameStore((store) => store.isEmpty)

  if (isEmpty) return <EmptyList />

  if (isLoading) {
    return (
      <AltNamesContainer>
        {(
          Array
            .from({ length: showSkeletonCount }, () => nanoid())
            .map((id) => (
              <Skeleton
                key={id}
                height={40}
                variant="rectangular"
                sx={{ borderRadius: 2, mb: 0.5 }}
              />
            ))
        )}
      </AltNamesContainer>
    )
  }

  return (
    <AltNamesContainer ref={selected.refBox}>
      {altNames.map((item, index) => (
        <AltNameRow
          key={item.data.id}
          altName={item.data}
          onEdit={item.edit}
          onRemove={item.remove}
          disabled={isLoading}
          active={(selected.index === index) && selected.show}
        />
      ))}
    </AltNamesContainer>
  )
})
