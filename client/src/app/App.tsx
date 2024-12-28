import { CssBaseline } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ToastContainer } from "react-toastify"
import { LangContext } from "shared/context/lang"
import { Gallery } from "widgets/gallery"
import { Pages } from "pages/pages"
import { useSettings } from "features/settings"
import { styled } from "@mui/material/styles"
import { menu, menuBottom, Sidebar } from "widgets/sidebar"
import { CreateModalCategory } from "widgets/category-dialog"
import {
  CreateModalCharacteristic,
  EditModalCharacteristic,
  RemoveModalCharacteristic,
} from "features/characteristics"
import { CreateModalAltName, EditModalAltName, RemoveModalAltName } from "features/alt-names"
import { CreateModalTag, EditModalTag, RemoveModalTag } from "features/tag"

const Wrapper = styled("div")(() => ({
  height: "100vh",
  padding: 12,
  display: "flex",
}))

const Inner = styled("div")(() => ({
  display: "flex",
  transition: "0.5s",
  width: "100%",
  gap: 12,
}))

export const App = observer(() => {
  const { settings } = useSettings()

  return (
    <Wrapper>
      <CssBaseline />

      <Inner>
        <LangContext lang="sidebar">
          <Sidebar menu={menu} menuBottom={menuBottom} />
        </LangContext>

        <Gallery />
        <Pages />
      </Inner>

      <CreateModalCategory
        modals={(
          <>
            <CreateModalCharacteristic />
            <EditModalCharacteristic />
            <RemoveModalCharacteristic />

            <CreateModalAltName />
            <EditModalAltName />
            <RemoveModalAltName />

            <CreateModalTag />
            <EditModalTag />
            <RemoveModalTag />
          </>
        )}
      />

      <ToastContainer
        autoClose={3000}
        closeOnClick
        position="top-left"
        toastStyle={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
        }}
        theme={(
          settings.theme === "light"
            ? "light"
            : settings.theme === "dark"
              ? "dark"
              : "light"
        )}
      />
    </Wrapper>
  )
})
