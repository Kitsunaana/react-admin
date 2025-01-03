import { forwardRef } from "react"
import { Box, BoxProps } from "shared/ui/box"
import styled from "styled-components"
import { Skeleton } from "shared/ui/skeleton"

export const AltNamesContainer = styled(
  forwardRef((props: BoxProps, ref) => (<Box {...props} ref={ref} />)),
)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  overflow: "auto",
}))

export const AltNameLoader = styled(Skeleton)(() => ({
  "&&": {
    borderRadius: 8,
    marginBottom: 4,
    marginTop: 0,
    height: 40,
  },
}))
