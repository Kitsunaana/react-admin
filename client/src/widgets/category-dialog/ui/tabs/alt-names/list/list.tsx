import { AltNameRow } from "entities/alt-name"
import { observer } from "mobx-react-lite"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { Skeleton } from "shared/ui/skeleton"
import { EmptyList } from "shared/ui/empty-list"
import { useAltNames } from "../../../../facade/use-alt-names"
import { AltNamesContainer } from "./styles"

export const List = observer(({
  isLoading,
  isEmptyList,
  showSkeletonCount,
}: {
  isEmptyList: boolean
  isLoading: boolean
  showSkeletonCount: number
}) => {
  const altNames = useAltNames()
  const selected = useListKeyboardEvents()

  if (isEmptyList) return <EmptyList />

  if (isLoading) {
    return (
      <AltNamesContainer>
        {new Array(showSkeletonCount).fill(null).map((_, index) => (
          <Skeleton
            key={index}
            height={40}
            variant="rectangular"
            sx={{ borderRadius: 2, mb: 0.5 }}
          />
        ))}
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
