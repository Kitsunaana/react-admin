import { styled } from "@mui/material/styles"
import { ReactNode } from "react"
import { Box } from "shared/ui/box"

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Bottom = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const Content = styled(Box)`
  height: 100%;
  margin: 0px 8px;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
`

const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`

interface TableProps {
  header?: ReactNode
  content?: ReactNode
  bottom?: ReactNode
}

export const Table = (props: TableProps) => {
  const { header, bottom, content } = props

  return (
    <Container>
      <Header>{header}</Header>
      <Content>{content}</Content>
      <Bottom>{bottom}</Bottom>
    </Container>
  )
}
