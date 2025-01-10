import { LangContext } from "shared/context/lang"
import { Box } from "shared/ui/box"
import { Vertical } from "shared/ui/divider"
import { StyledRowItem } from "shared/ui/row-item"
import { ReactNode } from "react"

export const Layout = ({
  langBase,
  active,
  state,
  infoView,
  actions,
}: {
  langBase: string
  active: boolean
  state: string
  infoView: ReactNode
  actions: ReactNode
 }) => (
   <LangContext lang={langBase}>
     <StyledRowItem
       active={active}
       borderSuccess={state === "success"}
       borderError={state === "error"}
       bgError={state === "error"}
     >
       {infoView}
       <Box flex row ai>
         <Vertical />
         {actions}
       </Box>
     </StyledRowItem>
   </LangContext>
)
