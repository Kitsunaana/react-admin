import { CssBaseline } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ToastContainer } from "react-toastify"
import { LangContext } from "shared/context/lang"
import { Gallery } from "widgets/gallery"
import { Pages } from "pages/pages"
import { useSettings, useShowErrors } from "features/settings"
import { styled } from "@mui/material/styles"
import { menu, menuBottom, Sidebar } from "widgets/sidebar"

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

  useShowErrors()

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
