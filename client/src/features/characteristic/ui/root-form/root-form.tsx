import { FormHTMLAttributes } from "react"
import { Root } from "./styles"

export const RootForm = ({ children, ...other }: FormHTMLAttributes<HTMLFormElement> & {}) => (
  <Root {...other}>
    {children}
  </Root>
)
