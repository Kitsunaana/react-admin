import { styled } from "@mui/material/styles"
import { Checkbox } from "@mui/material"

export const IsShowPhotoWithGoods = styled(Checkbox)(() => ({
  marginLeft: 8,
  marginRight: 8,
  padding: 6,
}))

export const ContainerInputs = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
}))

export const EffectBlurBox = styled("div")(() => ({
  width: "100%",
}))

export const SliderBox = styled("div")(() => ({
  padding: "0px 16px",
}))
