import {
  Box, CssBaseline
} from "@mui/material"
import * as React from "react"
import { Route, Routes } from "react-router-dom"
import { Sidebar } from "../widgets/Sidebar/Sidebar"

export const App = () => {
  return (
    <Box sx={{
      height: "100vh",
      p: 1.5,
      display: "flex",
      gap: 1.5,
    }}>
      <CssBaseline/>

      <Sidebar />

      <Box sx={{
        width: 1,
        height: 1,
        boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
        background: ({ background }) => background.sectionBackground,
        borderRadius: 2,
      }}>
        <Routes>
          <Route path="/" element={<div>1</div>}/>
        </Routes>
      </Box>
    </Box>
  )
}
