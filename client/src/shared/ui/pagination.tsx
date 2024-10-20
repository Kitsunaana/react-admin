import { Pagination as MUIPagination, PaginationProps as MUIPaginationProps } from "@mui/material"
import { useSearchParams } from "react-router-dom"

interface PaginationProps extends MUIPaginationProps {}

export const Pagination = (props: PaginationProps) => {
  const { count, onChange, ...other } = props

  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <MUIPagination
      page={Number(searchParams.get("page")) || 1}
      count={Math.ceil((count ?? 0) / 25)}
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
