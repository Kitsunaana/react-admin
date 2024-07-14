import { createRoot } from "react-dom/client"
import { App } from "./app/App"
import { ThemeProvider } from "./app/providers/Theme"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
