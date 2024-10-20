import { CategoriesPage } from "pages/categories"
import { SettingsPage } from "pages/settings"
import { StopListPage } from "pages/stop-list"
import { Navigate, RouteProps } from "react-router-dom"

export enum AppRoutes {
  CATALOG = "catalog",
  SETTINGS = "settings",
  STOP_LIST = "stop-list",
  HOME = "",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.SETTINGS]: "/users/settings",
  [AppRoutes.STOP_LIST]: "/stop-list",
  [AppRoutes.HOME]: "/",
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.CATALOG]: {
    path: RoutePath.catalog,
    element: <CategoriesPage />,
  },
  [AppRoutes.SETTINGS]: {
    path: RoutePath.settings,
    element: <SettingsPage />,
  },
  [AppRoutes.STOP_LIST]: {
    path: RoutePath["stop-list"],
    element: <StopListPage />,
  },
  [AppRoutes.HOME]: {
    path: RoutePath[""],
    element: <Navigate to="/catalog" replace />,
  },
}
