import { ReactNode } from "react"
import { Box } from "shared/ui/box"
import { Vertical } from "shared/ui/divider"

export const Layout = ({
  list,
  actions,
}: {
  list: ReactNode
  actions: ReactNode
}) => (
  <Box flex row grow sx={{ height: 1 }}>
    {list}
    <Vertical />
    <Box flex ai sx={{ pt: 1 }}>
      {actions}
    </Box>
  </Box>
)
