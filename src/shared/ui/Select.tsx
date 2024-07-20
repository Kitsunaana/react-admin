import { alpha, IconButton, TextFieldProps } from "@mui/material"
import React, {
  FocusEvent,
  forwardRef, useEffect, useRef, useState,
} from "react"
import { listenForOutsideClicks } from "shared/lib/hooks"
import { Input } from "shared/ui/Input"
import { Icon } from "shared/ui/Icon"
import { Box } from "shared/ui/Box"
import {
  ChangeHandler, RefCallBack, UseFormSetValue,
} from "react-hook-form"

interface Option {
  id?: number
  value: string
  icon?: string
  default?: boolean
}

interface SelectProps {
  options: Option[],
  inputProps: TextFieldProps

  clear?: boolean
  setValue: UseFormSetValue<{}>
  value: Option,

  name: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
  ref: RefCallBack
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    options, inputProps, clear, setValue, value, name,
  } = props

  const {
    onChange: onChangeInputProps,
    onFocus: onFocusInputProps,
    ...otherInputProps
  } = inputProps

  const menuRef = useRef(null)

  const [listening, setListening] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(listenForOutsideClicks({
    setIsOpen: setVisible,
    setListening,
    listening,
    menuRef,
  }))

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    setValue(name, { ...value, value: event.target.value })

    if (typeof onChangeInputProps === "function") onChangeInputProps(event)
  }

  const handleOnFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVisible(true)

    if (typeof onFocusInputProps === "function") onFocusInputProps(event)
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
      ref={menuRef}
    >
      <Input
        fullWidth
        value={value.value}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        InputProps={{
          startAdornment: ((value.value !== "" && value.icon) && (
            <Icon
              name={value.icon}
              sx={{ fontSize: 20 }}
            />
          )),
          endAdornment: (
            <>
              {(value.value !== "" && clear) && (
                <IconButton
                  sx={{ p: 0.25 }}
                  onClick={() => {
                    // @ts-ignore
                    setValue(name, { ...value, value: "" })
                  }}
                >
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
        {...otherInputProps}
      />
      <Box sx={{
        position: "absolute",
        width: 1,
        maxHeight: 200,
        top: 38,
        right: 0,
        overflow: "hidden",
        zIndex: 100000000000000000,
        visibility: visible ? "visible" : "hidden",
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
                // @ts-ignore
                setValue(name, item)
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
                ...(value.value === item.value ? {
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
})
