import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { Pagination } from "shared/ui/pagination"
import { LangContext, useLang } from "shared/context/lang"
import { memo } from "react"
import { Container } from "./styles"

export const Footer = memo(({
  count,
}: {
  count: number
}) => {
  const langBase = useLang("bottom")

  return (
    <LangContext lang={langBase}>
      <Container>
        <Text
          name="count"
          value={String(count)}
          translateOptions={{
            components: {
              strong: <Mark />,
            },
          }}
        />
        <Pagination count={count} />
      </Container>
    </LangContext>
  )
})
