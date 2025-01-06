import { useNavigate } from "react-router-dom"

export const useProductsNavigate = (caption: string) => {
  const navigate = useNavigate()

  return () => {
    const searchParams = new URLSearchParams({ category: caption })
      .toString()

    navigate(`/catalog/products?${searchParams}`)
  }
}
