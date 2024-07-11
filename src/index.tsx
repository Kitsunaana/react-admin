import { createRoot } from "react-dom/client"
import { App } from "./app/App"
import { ThemeProvider } from "./app/providers/Theme"
import { StoreProvider } from "./app/providers/Redux"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <StoreProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreProvider>,
)
