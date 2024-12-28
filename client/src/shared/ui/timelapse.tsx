import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"

export const Timelapse = () => (
  <Box
    sx={{
      position: "absolute",
      width: 1,
      height: 1,
      bgcolor: "white",
      zIndex: 2,
    }}
  >
    <Box
      sx={{
        border: ({ palette }) => `4px dashed ${palette.primary.main}`,
        borderRadius: "50%",
        padding: "10px",
        position: "absolute",
        width: 80,
        height: 80,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        name="timelapse"
        sx={{
          fontSize: 65,
          color: ({ palette }) => palette.primary.main,
        }}
      />
    </Box>
  </Box>
)
