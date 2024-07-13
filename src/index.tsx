import { createRoot } from "react-dom/client"
import {
  BrowserRouter,
} from "react-router-dom"
import { App } from "./app/App"
import { ThemeProvider } from "./app/providers/Theme"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
