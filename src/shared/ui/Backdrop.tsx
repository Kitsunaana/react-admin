import React, { useEffect, useState } from "react"
import { addEvent } from "shared/lib/event"
import { Backdrop as MUIBackdrop } from "@mui/material"

export const Backdrop = () => {
  const [backdropActive, setBackdropActive] = useState(false)

  useEffect(() => addEvent("backdrop", ({ isActive }) => {
    setBackdropActive(!isActive)
  }), [])

  return <MUIBackdrop open={backdropActive} />
}
