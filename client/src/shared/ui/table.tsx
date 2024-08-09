import React, { ReactNode } from "react"
import { Box } from "shared/ui/box"

interface TableProps {
  header?: ReactNode
  content?: ReactNode
  bottom?: ReactNode
}

export const Table = (props: TableProps) => {
  const { header, bottom, content } = props

  return (
    <Box flex jc_sp sx={{ height: 1 }}>
      <Box flex gap sx={{ p: 1 }}>
        {header}
      </Box>
      <Box
        sx={{
          height: 1,
          mx: 1,
          borderRadius: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {content}
      </Box>
      <Box
        flex
        row
        jc_sp
        ai
        sx={{
          p: 1,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        {bottom}
      </Box>
    </Box>
  )
}
