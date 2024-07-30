import { createRoot } from "react-dom/client"
import { ThemeProvider } from "app/providers/theme"
import { App } from "app/App"
import { ErrorBoundary } from "app/providers/error-boundary"
import "shared/config/translate"
import { Provider } from "react-redux"
import { store } from "app/providers/store"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "app/providers/query-client"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>,
)
