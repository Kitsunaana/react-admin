import { useTheme } from "@mui/material"
import { Spinner } from "shared/ui/spinner"
import { Container } from "./styles"

export const Loader = () => {
  const theme = useTheme()

  return (
    <Container>
      <Spinner
        color={theme.palette.warning.dark}
        height={100}
        width={100}
      />
    </Container>
  )
}
