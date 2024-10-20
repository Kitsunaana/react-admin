import { styled } from "@mui/material/styles"
import { Box } from "shared/ui/box"
import { useTheme } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/route-config"
import { Suspense } from "react"
import { Spinner } from "shared/ui/spinner"
import { LangContext } from "shared/context/lang"

const PagesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
  background: theme.background.sectionBackground,
  borderRadius: 12,
}))

export const Pages = () => {
  const { palette } = useTheme()

  return (
    <PagesContainer>
      <Routes>
        {Object.entries(routeConfig).map(([key, route]) => (
          <Route
            key={key}
            path={route.path}
            element={(
              <Suspense fallback={(
                <Box flex grow ai jc>
                  <Spinner
                    color={palette.warning.dark}
                    height={100}
                    width={100}
                  />
                </Box>
              )}
              >
                <LangContext lang={key}>
                  {route.element}
                </LangContext>
              </Suspense>
            )}
          />
        ))}
      </Routes>
    </PagesContainer>
  )
}
