import GoodsPage from "pages/Goods/goods-page"
import { ReactNode } from "react"
import { SettingsPage } from "pages/settings"
import { CategoriesPage } from "pages/categories"

export enum AppRoutes {
  CATALOG = "catalog",
  SETTINGS = "settings",
  GOODS = "goods",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.GOODS]: "/catalog/goods",
  [AppRoutes.SETTINGS]: "/users/settings",
}

export const routeConfig: Record<AppRoutes, { path: string, element: ReactNode }> = {
  [AppRoutes.CATALOG]: {
    path: RoutePath.catalog,
    element: <CategoriesPage />,
  },
  [AppRoutes.SETTINGS]: {
    path: RoutePath.settings,
    element: <SettingsPage />,
  },
  [AppRoutes.GOODS]: {
    path: RoutePath.goods,
    element: <GoodsPage />,
  },
}
