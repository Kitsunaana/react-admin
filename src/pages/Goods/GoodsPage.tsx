import { Box } from "shared/ui/Box"
import {
  alpha,
  IconButton,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import React, {
  MutableRefObject,
  useEffect, useRef, useState,
} from "react"
import { listenForOutsideClicks } from "shared/lib/hooks"
import { Input } from "shared/ui/Input"
import { Select } from "shared/ui/Select"

/* export const Input = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "8.5px 12px 8.5px 4px",
    height: 18,
  },
  "& .MuiFormLabel-root": {
    fontSize: 12,
  },
  "& .MuiFormLabel-root[data-shrink='true']": {
    transform: "translate(16px, -6px) scale(0.75)",
  },
  "& legend": {
    fontSize: 10,
  },
  "& .MuiInputBase-root": {
    paddingRight: 4,
    paddingLeft: 4,
  },
})) */

/* interface ListenForOutsideClicksProps {
  listening: boolean
  setListening: (listening: boolean) => void
  setIsOpen: (open: boolean) => void
  menuRef: MutableRefObject<null | HTMLElement>
}

export const listenForOutsideClicks = (props: ListenForOutsideClicksProps) => {
  const {
    menuRef, setIsOpen, setListening, listening,
  } = props

  return () => {
    if (listening) return
    if (!menuRef.current) return

    setListening(true);

    ["click", "touchstart"].forEach((type) => {
      document.addEventListener("click", (event) => {
        const { current } = menuRef
        const node = event.target as unknown as Node

        if (node === null) return

        if (current?.contains(node)) return

        setIsOpen(false)
      })
    })
  }
} */

/* interface SelectProps<T> {
  options: T[],
  inputProps: TextFieldProps
  value?: string

}

export function Select<T extends { id: number; value: string }>(props: SelectProps<T>) {
  const {
    options, inputProps, value: valueProps, ...other
  } = props

  const menuRef = useRef(null)

  const [value, setValue] = useState<string>(valueProps ?? "")
  const [listening, setListening] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(listenForOutsideClicks({
    setIsOpen: setVisible,
    setListening,
    listening,
    menuRef,
  }))

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return (
    <div style={{ position: "relative", width: "100%" }} ref={menuRef}>
      <Input
        fullWidth
        value={value}
        onChange={handleOnChange}
        onFocus={() => setVisible(true)}
        InputProps={{
          startAdornment: (value !== "" && <Icon name="typeGood" sx={{ fontSize: 20 }} />),
          endAdornment: (
            <>
              {value !== "" && (
              <IconButton sx={{ p: 0.25 }} onClick={() => setValue("")}>
                <Icon
                  sx={{
                    fontSize: 20,
                  }}
                  name="clear"
                />
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
          {options.map((option) => (
            <Box
              onMouseDown={(event) => {
                setValue(option.value)
                setVisible(false)
              }}
              key={option.id}
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
                ...(value === option.value ? {
                  backgroundColor: ({ palette }) => alpha(palette.primary.main, 0.25),
                  border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
                } : {}),
              }}
            >
              {option.value}
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  )
} */

const GoodsPage = () => (
  <Box flex gap>
    <Box flex row ai gap>
      <Input sx={{ flexGrow: 1 }} size="small" label="Поиск" />
      <Box flex row>
        {[1, 2, 3].map((icon) => (
          <IconButton key={icon} sx={{ p: 0.5 }}>
            <Icon name="" sx={{ fontSize: 20 }} />
          </IconButton>
        ))}
      </Box>
    </Box>
    <Box ai flex row gap>
      <Select
        clear
        inputProps={{ size: "small", label: "Категория" }}
        options={[{ id: 1, value: "option1" }, { id: 2, value: "option2" }]}
      />

      <Select
        clear
        inputProps={{ size: "small", label: "Тип товара" }}
        options={
        [
          {
            id: 1,
            value: "option1",
            icon: "consumable",
          },
          {
            id: 2,
            value: "option2",
            icon: "typeGood",
            default: true,
          },
        ]
      }
      />
    </Box>
  </Box>
)

export default GoodsPage
