import { alpha, IconButton, TextFieldProps } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { listenForOutsideClicks } from "shared/lib/hooks"
import { Input } from "shared/ui/Input"
import { Icon } from "shared/ui/Icon"
import { Box } from "shared/ui/Box"

interface SelectProps<T> {
  options: T[],
  inputProps: TextFieldProps

  startAdornmentIcon?: string
  clear?: boolean
}

interface Option {
  id?: number
  value: string
  icon?: string
  default?: boolean
}

export function Select<T extends Option>(props: SelectProps<T>) {
  const {
    options, inputProps, clear,
  } = props

  const menuRef = useRef(null)

  const [listening, setListening] = useState(false)
  const [visible, setVisible] = useState(false)

  const findDefaultOption = options.find((option) => option.default)
  const [option, setOption] = useState<Option>(findDefaultOption ?? {
    value: "",
  })

  useEffect(listenForOutsideClicks({
    setIsOpen: setVisible,
    setListening,
    listening,
    menuRef,
  }))

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOption((prevState) => ({ ...prevState, value: event.target.value }))
  }

  return (
    <div style={{ position: "relative", width: "100%" }} ref={menuRef}>
      <Input
        fullWidth
        value={option.value}
        onChange={handleOnChange}
        onFocus={() => setVisible(true)}
        InputProps={{
          startAdornment: ((option.value !== "" && option.icon) && (
            <Icon
              name={option.icon}
              sx={{ fontSize: 20 }}
            />
          )),
          endAdornment: (
            <>
              {(option.value !== "" && clear) && (
                <IconButton sx={{ p: 0.25 }} onClick={() => setOption((prevState) => ({ ...prevState, value: "" }))}>
                  <Icon sx={{ fontSize: 20 }} name="clear" />
                </IconButton>
              )}
              <IconButton sx={{ p: 0.25 }} onClick={() => setVisible((prevState) => !prevState)}>
                <Icon
                  sx={{
                    fontSize: 20,
                    transition: ".3s",
                    transform: `rotate(${visible ? 180 : 0}deg)`,
                  }}
                  name="expand"
                />
              </IconButton>
            </>
          ),
        }}
        {...inputProps}
      />
      <Box sx={{
        position: "absolute",
        width: 1,
        maxHeight: 200,
        top: 38,
        right: 0,
        overflow: "hidden",
      }}
      >
        <Box
          flex
          gap={0.25}
          sx={{
            width: 1,
            maxHeight: 200,
            backgroundColor: ({ palette }) => palette.grey["800"],
            boxShadow: ({ shadows }) => (visible ? shadows[2] : null),
            borderRadius: 2,
            p: 0.5,
            overflowY: "scroll",
            overflowX: "hidden",
            transition: ".2s",
            border: "5px solid transparent",
            transform: `translate(0px, ${visible ? 0 : "-200"}px)`,
          }}
        >
          {options.map((item) => (
            <Box
              flex
              row
              ai
              jc_sp
              onMouseDown={() => {
                setVisible(false)
                setOption(item)
              }}
              key={item.id}
              sx={{
                cursor: "pointer",
                px: 1,
                py: 0.25,
                borderRadius: 1.5,
                border: "1px solid transparent",
                textAlign: "right",
                transition: ".2s",
                "&:hover": {
                  backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
                  border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
                },
                ...(option.value === item.value ? {
                  backgroundColor: ({ palette }) => alpha(palette.primary.main, 0.25),
                  border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
                } : {}),
              }}
            >
              {item.icon && <Icon name={item.icon} />}
              {item.value}
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  )
}
