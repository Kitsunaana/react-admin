import { Skeleton as MUIBaseSkeleton, SkeletonProps as MUISkeletonProps } from "@mui/material"

interface SkeletonProps extends MUISkeletonProps {
 borderRadius?: number
}

export const Skeleton = (props: SkeletonProps) => {
  const { sx, borderRadius, ...other } = props

  return (
    <MUIBaseSkeleton
      sx={{
        padding: 1,
        borderRadius: borderRadius ?? 2,
        margin: "8px 0px 4px",
        transformOrigin: "top",
        transform: "unset",
        ...sx,
      }}
      {...other}
    />
  )
}
