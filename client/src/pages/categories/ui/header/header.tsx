import { ReactNode } from "react"
import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { LangContext, useLang } from "shared/context/lang"
import { Container, Actions } from "./styles"
import { useHeaderForm } from "../../view-model/use-header-form"

export const Header = ({
  actions,
}: {
  actions: ReactNode
}) => {
  const langBase = useLang("top")

  const headerForm = useHeaderForm()

  return (
    <LangContext lang={langBase}>
      <Container>
        <Controller
          control={headerForm.control}
          name="search"
          render={({ field }) => (
            <Input
              {...field}
              fullWidth
              size="small"
              onClear={headerForm.handleClear}
              onFocus={headerForm.handleFocus}
              onBlur={headerForm.handleBlur}
              label={(
                <Text name="search" />
              )}
            />
          )}
        />
        <Actions>{actions}</Actions>
      </Container>
    </LangContext>
  )
}
