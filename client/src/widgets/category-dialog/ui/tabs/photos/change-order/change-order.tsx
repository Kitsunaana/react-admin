import { memo } from "react"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { useToggle } from "shared/hooks/use-toggle"
import { ChangeOrderButton } from "../change-order-button"
import {
  ArrowDownButton, ArrowUpButton, Container, Count,
} from "./styles"

export const ChangeOrder = memo(({
  id,
  order,
  onClick,
}: {
  id: string
  order: number | null
  onClick: (order: number, id: string) => void
}) => {
  const [open, toggleOpen] = useToggle()

  const width = String(order).split("").length

  return (
    <Container
      fullWidth={order === 0}
      width={width}
      open={open}
    >
      <ArrowUpButton open={open}>
        <ChangeOrderButton
          direction="moveUp"
          onClick={() => onClick((order ?? 0) + 1, id)}
        />
      </ArrowUpButton>
      {order === 0 ? (
        <Icon
          name="infinity"
          onClick={toggleOpen}
          sx={{ cursor: "pointer" }}
          help={{
            title: (
              <Text
                onlyText
                name="forms.displayAccordingCreationDate"
              />
            ),
          }}
        />
      ) : (
        <Count onClick={toggleOpen}>{order}</Count>
      )}
      <ArrowDownButton open={open}>
        <ChangeOrderButton
          direction="moveDown"
          onClick={() => onClick((order ?? 0) - 1, id)}
        />
      </ArrowDownButton>
    </Container>
  )
})
