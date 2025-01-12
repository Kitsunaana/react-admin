import { memo, ReactNode } from "react"
import { LangContext, useLang } from "shared/context/lang"
import { shallowEqual } from "shared/lib/utils"
import { Container, Actions } from "./styles"

export const Layout = memo(({
  form,
  actions,
}: {
  form: ReactNode
  actions: ReactNode
}) => {
  const langBase = useLang("top")

  return (
    <LangContext lang={langBase}>
      <Container>
        {form}
        <Actions>{actions}</Actions>
      </Container>
    </LangContext>
  )
}, shallowEqual)
