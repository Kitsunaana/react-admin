import { createRoot } from "react-dom/client"
import { ThemeProvider } from "app/providers/Theme"
import { App } from "app/App"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
