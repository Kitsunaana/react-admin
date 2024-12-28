import { Box, BoxProps } from "shared/ui/box"
import styled from "styled-components"

interface TagViewProps extends BoxProps {
  color: string
}

export const TagView = styled(
  ({ color, ...other }: TagViewProps) => <Box {...other} />,
)`
  padding-left: 14px;
  padding-right: 14px;
  min-height: 24px;
  background: ${({ color }) => color};
  position: relative;
  clip-path: polygon(calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%, 8px 50%, 0% 0%);
  display: inline-flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
`
