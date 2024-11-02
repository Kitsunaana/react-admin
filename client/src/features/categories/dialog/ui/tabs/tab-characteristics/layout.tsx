import { ReactNode } from "react"
import { Box } from "shared/ui/box"
import { Vertical } from "shared/ui/divider"

interface TabCharacteristicsLayoutProps {
  emptyList?: ReactNode
  list: ReactNode
  actions: ReactNode
}

export const TabCharacteristicsLayout = (props: TabCharacteristicsLayoutProps) => {
  const { emptyList, list, actions } = props

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {emptyList}
      {list}
      <Vertical />
      <Box flex ai sx={{ pt: 1 }}>
        {actions}
      </Box>
    </Box>
  )
}
