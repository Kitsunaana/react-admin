import { createRoot } from "react-dom/client"
import { ThemeProvider } from "app/providers/Theme"
import { App } from "app/App"
import { ErrorBoundary } from "app/providers/ErrorBoundary"
import "shared/config/translate"
import { Provider } from "react-redux"
import { store } from "app/providers/Store"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,
)
