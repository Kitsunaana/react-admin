import { Box } from "shared/ui/box"
import { Button } from "@mui/material"
import { Icon } from "shared/ui/icon"

interface NavigationProps {
  disabledPrev?: boolean
  disabledNext?: boolean
  onPrevClick: () => void
  onNextClick: () => void
}

export const Navigation = (props: NavigationProps) => {
  const {
    disabledNext, disabledPrev, onPrevClick, onNextClick,
  } = props

  return (
    <Box
      sx={{
        backgroundColor: ({ palette }) => palette.common.black,
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
        borderRadius: 3,
        p: 0.75,
        display: "inline-flex",
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: 33,
        gap: 0.75,
      }}
    >
      <Button
        sx={{
          p: 1,
          minWidth: 0,
          backgroundColor: ({ palette }) => palette.primary.dark,
          borderRadius: 2,
        }}
        variant="contained"
        color="primary"
        disabled={disabledPrev}
        onClick={onPrevClick}
      >
        <Icon name="next" sx={{ transform: "rotate(180deg)", color: "white" }} />
      </Button>
      <Button
        sx={{
          p: 1,
          minWidth: 0,
          backgroundColor: ({ palette }) => palette.primary.dark,
          borderRadius: 2,
        }}
        variant="contained"
        color="primary"
        disabled={disabledNext}
        onClick={onNextClick}
      >
        <Icon name="next" sx={{ color: "white" }} />
      </Button>
    </Box>
  )
}
