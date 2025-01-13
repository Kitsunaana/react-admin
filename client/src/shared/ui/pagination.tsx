import { Pagination as MUIPagination, PaginationProps as MUIPaginationProps } from "@mui/material"
import { useSearchParams } from "react-router-dom"

export const Pagination = ({
  count,
  onChange,
  ...other
}: MUIPaginationProps & {
  count: number
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <MUIPagination
      page={Number(searchParams.get("page")) || 1}
      count={Math.ceil((count) / 25)}
      variant="outlined"
      shape="rounded"
      onChange={(event, page) => {
        onChange?.(event, page)
        setSearchParams((prev) => {
          prev.set("page", String(page))
          return prev
        })
      }}
      {...other}
    />
  )
}
