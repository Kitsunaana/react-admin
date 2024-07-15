import { createRoot } from "react-dom/client"
import { ThemeProvider } from "app/providers/Theme"
import { App } from "app/App"
import { ErrorBoundary } from "app/providers/ErrorBoundary"
import "shared/config/translate"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ErrorBoundary>,
)
