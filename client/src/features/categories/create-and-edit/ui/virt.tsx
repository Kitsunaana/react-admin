import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete"
import useMediaQuery from "@mui/material/useMediaQuery"
import ListSubheader from "@mui/material/ListSubheader"
import Popper from "@mui/material/Popper"
import { useTheme, styled } from "@mui/material/styles"
import { VariableSizeList, ListChildComponentProps } from "react-window"
import Typography from "@mui/material/Typography"
import { Input } from "shared/ui/form/input"

import { SelectItem } from "shared/ui/form/select"
import { Text } from "shared/ui/text"
import { Icon } from "shared/ui/icon"
import { forwardRef, HTMLAttributes } from "react"
import icons from "./tabs/icons.json"

const LISTBOX_PADDING = 8 // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props

  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    left: "unset",
    right: "50%",
    transform: "translate(50%, 0px)",
    margin: "0px",
    width: "98%",
    height: "35px",
    top: (style.top as number) + LISTBOX_PADDING,
  }

  const { key, ...optionProps } = dataSet[0]

  return (
    <SelectItem key={key} {...optionProps} style={inlineStyle}>
      <Icon>{dataSet[1]}</Icon>
      <Text caption={dataSet[1]} />
    </SelectItem>
  )
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null)

  React.useEffect(() => {
    if (ref.current != null) ref.current.resetAfterIndex(0, true)
  }, [data])

  return ref
}

export const ListboxComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, ...other } = props

  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item)
      itemData.push(...(item.children || []))
    },
  )

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  })
  const itemCount = itemData.length
  const itemSize = smUp ? 40 : 48

  const getChildSize = (child: React.ReactElement) => itemSize

  const getHeight = () => {
    if (itemCount > 8) return 6 * itemSize
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

export const Virtualize = () => (
  <Autocomplete
    open
    size="small"
    id="virtualize-demo"
    sx={{ width: "70%" }}
    disableListWrap
    ListboxComponent={ListboxComponent}
    options={icons}
    renderInput={(params) => <Input {...params} label="10,000 options" />}
    renderOption={(props, option, state) => [props, option, state.index] as React.ReactNode}
  />
)
