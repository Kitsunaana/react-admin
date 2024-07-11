import {
  Box, CssBaseline,
} from "@mui/material"
import { Sidebar } from "../widgets/Sidebar/Sidebar"

export const App = () => (
  <Box sx={{ height: "100vh" }}>
    <CssBaseline />
    <Sidebar />
  </Box>
)
