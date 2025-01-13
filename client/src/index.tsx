import { QueryClientProvider } from "@tanstack/react-query"
import { App } from "app/App"
import { ErrorBoundary } from "app/providers/error-boundary"
import { queryClient } from "app/providers/query-client"
import { ThemeProvider } from "app/providers/theme"
import { SettingsContextProvider } from "features/settings/model/context"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "shared/config/translate"
import { Confirmations } from "widgets/confirmations"
import { Gallery } from "widgets/gallery"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)
root.render(
  <QueryClientProvider client={queryClient}>

    <ErrorBoundary>
      <BrowserRouter>
        <SettingsContextProvider>
          <ThemeProvider>
            <Confirmations>
              <Gallery>
                <App />
              </Gallery>
            </Confirmations>
          </ThemeProvider>
        </SettingsContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </QueryClientProvider>,
)
