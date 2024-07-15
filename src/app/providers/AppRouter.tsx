import { routeConfig } from "shared/config/routeConfig"

import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"

export const AppRouter = () => (
  <Routes>
    {Object.entries(routeConfig).map(([key, route]) => (
      <Route
        key={key}
        path={route.path}
        element={(
          <Suspense fallback={<div>Loader</div>}>
            {route.element}
          </Suspense>
        )}
      />
    ))}
  </Routes>
)
