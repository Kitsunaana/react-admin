import {
  Box, CssBaseline,
} from "@mui/material"
import { Sidebar } from "../widgets/Sidebar/Sidebar"
import { ThemeProvider } from "./providers/Theme"

export const App = () => (
  <ThemeProvider>
    <Box sx={{ height: "100vh" }}>
      <CssBaseline />
      <Sidebar />
    </Box>
  </ThemeProvider>
)
