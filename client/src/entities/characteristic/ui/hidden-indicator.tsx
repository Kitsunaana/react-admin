import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"

interface HiddenIndicatorProps {
  hidden: boolean
}

export const HiddenIndicator = (props: HiddenIndicatorProps) => {
  const { hidden } = props

  if (!hidden) return null

  return (
    <Box
      flex
      ai
      row
      sx={{ mr: 1 }}
      help={{ title: <Text name="hiddenForClient" /> }}
    >
      <Icon
        name="invisible"
        fontSize="small"
        color="warning"
      />
    </Box>
  )
}
