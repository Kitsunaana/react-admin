import {
  Box, CssBaseline, Icon, TextField,
} from "@mui/material"
import { Sidebar } from "../widgets/Sidebar/Sidebar"

export const App = () => {
  console.log("hw")
  return (
    <Box sx={{ height: "100vh" }}>
      <CssBaseline />
      <Sidebar />
    </Box>
  )
}
