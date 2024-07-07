import { Box, BoxProps as MUIBoxProps } from "@mui/material"

interface BoxProps extends MUIBoxProps {

}

const Default = (props: BoxProps) => {
  const { } = props

  return <Box />
}

export { Default as Box }
