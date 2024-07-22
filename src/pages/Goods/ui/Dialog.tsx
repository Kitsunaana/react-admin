import * as React from "react"
import Button from "@mui/material/Button"
import MUIDialog from "@mui/material/Dialog"
import MUIDialogActions from "@mui/material/DialogActions"
import MUIDialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import {
  Dispatch, memo, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState,
} from "react"
import { Box } from "shared/ui/Box"
import { Text } from "shared/ui/Text"
import {
  alpha, IconButton, MenuItem, Tab, Tabs as MUITabs, TextField,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { Select } from "shared/ui/Select"
import { Input } from "shared/ui/Input"
import {
  Control,
  Controller,
  FormState,
  useForm, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch,
} from "react-hook-form"
import { Option } from "pages/Goods/ui/Header"
import { Divider } from "shared/ui/Divider"
import { shallowEqual } from "shared/lib/utils"
import Autocomplete from "@mui/material/Autocomplete"

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props

  return (
    <div
      style={{ height: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (children)}
    </div>
  )
}

interface UseFormProps {
  category: Option
  caption: string
  description: string
}

interface ParametersProps {
  errors: FormState<UseFormProps>["errors"]
  register: UseFormRegister<UseFormProps>
  getValues: UseFormGetValues<UseFormProps>
  setValue: UseFormSetValue<UseFormProps>
}

const categoryList = [
  { value: "Option 1", icon: "good" },
  { value: "Option 2", icon: "additional" },
  { value: "Option 3" },
  { value: "" },
]

export const Parameters = (props: ParametersProps & { control: Control<UseFormProps, any> }) => {
  const {
    errors, control,
  } = props

  return (
    <>
      <Controller
        name="category"
        control={control}
        rules={{
          validate: (data: Option) => (categoryList.find((category) => category.value === data?.value && data?.value)
            ? true
            : "requiredSelect"),
        }}
        render={({ field: { onChange, value, ...other } }) => (
          <Autocomplete
            {...other}
            value={value}
            onChange={(event, value) => onChange(value)}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            options={categoryList}
            getOptionLabel={(option) => option.value}
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            renderInput={(params) => {
              if (typeof value === "object" && value !== null) {
                params.InputProps.startAdornment = value.icon
                  ? (<Icon sx={{ fontSize: 20 }} name={value.icon ?? ""} />)
                  : undefined
              }

              return (
                <TextField
                  {...params}
                  sx={{
                    "& .MuiFormLabel-root": {
                      fontSize: 12,
                    },

                    "& .MuiFormLabel-root[data-shrink='true']": {
                      top: 3,
                    },

                    "& .MuiInputBase-input": {
                      py: "0px !important",
                    },

                    "& legend": {
                      fontSize: "9px",
                    },
                  }}
                  error={!!errors.category}
                  helperText={<Text onlyText langBase="global.message" name={errors.category?.message} />}
                  fullWidth
                  label="Категория"
                />
              )
            }}
            renderOption={(props, option, state) => {
              const { key, ...other } = props

              if (!option.value) return null

              return (
                <MenuItem
                  key={key}
                  {...other}
                  sx={{
                    mx: 1,
                    my: 0.25,
                    px: "4px !important",
                    py: "4px !important",
                    display: "flex",
                    justifyContent: "space-between !important",
                    alignItems: "center",
                    borderRadius: 1.5,
                    border: "1px solid transparent",
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
                      border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
                    },

                    "&[aria-selected='true']": {
                      backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
                      border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
                    },
                  }}
                >
                  {option.icon ? <Icon name={option.icon} /> : <div />}
                  {option.value}
                </MenuItem>
              )
            }}
          />
        )}
      />
      {/* <Select
        clear
        inputProps={{
          label: "Категория",
          fullWidth: true,
          size: "small",
          sx: { mb: 1 },
          error: !!errors.category,
          helperText: (
            <Text
              onlyText
              langBase="global.message"
              name={errors.category?.message}
            />
          ),
        }}
        setValue={setValue}
        options={categoryList}
        value={getValues("category")}
        {...register("category", {
          validate: (data: Option) => {
            const findCategory = categoryList.find((category) => category.value === data?.value)
            if (!findCategory) return "requiredSelect"

            return true
          },
        })}
      /> */}
      <Controller
        name="caption"
        control={control}
        defaultValue=""
        rules={{ required: "required", minLength: { value: 3, message: "minLength" } }}
        render={({ field }) => (
          <Input
            {...field}
            label="Заголовок"
            size="small"
            fullWidth
            error={!!errors.caption}
            helperText={(
              <Text
                onlyText
                langBase="global.message"
                name={errors.caption?.message}
                value="3"
              />
            )}
          />
        )}
      />
    </>
  )
}

interface DescriptionProps extends ParametersProps {}

export const Description = (props: DescriptionProps & { watch: UseFormWatch<UseFormProps> }) => {
  const {
    errors, register, getValues, setValue, watch,
  } = props

  const [description, setDescription] = useState("")

  const { ...other } = register("description", {
    onChange: (event) => {
      setDescription(event.target.value)
    },
  })

  const dividerRender = useMemo(() => <Divider sx={{ my: 1 }}>Предпросмотр</Divider>, [])

  return (
    <>
      <Input
        fullWidth
        label="Описание"
        multiline
        rows="10"
        sx={{
          "& .MuiInputBase-root": {
            py: 0.5,
          },
        }}
        {...other}
      />
      {dividerRender}
      {description && (
        <Text
          sx={{
            border: ({ palette }) => `1px solid ${alpha(palette.grey["600"], 0.5)}`,
            px: 1,
            py: 1,
            borderRadius: 1,
          }}
          caption={description}
        />
      )}
    </>
  )
}

const tabs = [
  { id: 0, caption: "Общие параметры", icon: "warning" },
  { id: 1, caption: "Описание", icon: "description" },
  { id: 2, caption: "Фото", icon: "photo" },
  { id: 3, caption: "Прочее", icon: "other" },
  { id: 4, caption: "Характеристики", icon: "characteristic" },
  { id: 5, caption: "Алтернативные названия", icon: "alternativeName" },
]

interface DialogHeaderProps {
  fullScreen: boolean
  setFullScreen: Dispatch<SetStateAction<boolean>>
}

export const DialogHeader = memo((props: DialogHeaderProps) => {
  const { fullScreen, setFullScreen } = props

  return (
    <Box
      flex
      ai
      row
      sx={{
        backgroundImage: ({ background }) => background.hatch.warning,
        backgroundSize: "7px 7px",
        borderRadius: 1,
        p: 1,
        mx: 1,
        mt: 1,
        mb: 0.5,
        height: 38,
        border: ({ palette }) => `1px solid ${alpha(palette.grey["500"], 0.25)}`,
      }}
    >
      <Text sx={{ display: "flex", justifyContent: "center", width: 1 }} caption="Создание товара" />
      <IconButton
        sx={{ p: 0.5 }}
        onClick={() => setFullScreen((prevState) => !prevState)}
      >
        <Icon
          name={fullScreen ? "fullscreenClose" : "fullscreenOpen"}
        />
      </IconButton>
    </Box>
  )
})

interface TabsProps {
  tab: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

interface TabLabelProps {
  icon: string
  caption: string
}

export const TabLabel = memo((props: TabLabelProps) => {
  const { icon, caption } = props

  return (
    <Box flex ai gap row>
      <Icon name={icon} sx={{ fontSize: 20 }} />
      <Text caption={caption} sx={{ fontSize: 14, textTransform: "none" }} />
    </Box>
  )
})

export const Tabs = memo((props: TabsProps) => {
  const { tab, onChange } = props

  return (
    <MUITabs
      value={tab}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        sx: {
          top: 0,
          height: 3,
          borderRadius: 2,
        },
      }}
      sx={{
        minHeight: 0,
        "& .MuiTabScrollButton-root": {
          opacity: "0.75 !important",
          width: "auto",
          "&.Mui-disabled": {
            opacity: "0.25 !important",
          },
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          value={tab.id}
          key={tab.id}
          sx={{
            p: 1.2,
            minHeight: 0,
            "&.Mui-selected": {
              backgroundImage: ({ background }) => background.gradient.primary,
            },
          }}
          label={(
            <TabLabel icon={tab.icon} caption={tab.caption} />
          )}
        />
      ))}
    </MUITabs>
  )
})

interface DialogActionsProps {
  isValid: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

export const DialogActions = memo((props: DialogActionsProps) => {
  const { isValid, onClose } = props

  return (
    <>
      <Button disabled={!isValid} onClick={() => onClose(false)}>
        Сохранить
      </Button>
      <Button onClick={() => onClose(false)} autoFocus>
        Отмена
      </Button>
    </>
  )
}, shallowEqual)

interface DialogLayoutProps {
  fullScreen: boolean
  open: boolean
  header?: ReactNode
  tabs?: ReactNode
  content?: ReactNode
  actions?: ReactNode
}

export const DialogLayout = (props: DialogLayoutProps) => {
  const {
    fullScreen, actions, open, header, content, tabs,
  } = props

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={open}
      sx={{
        borderRadius: 2,
      }}
      PaperProps={{
        sx: {
          ...(fullScreen ? {} : {
            maxWidth: 900,
            height: 580,
          }),
        },
      }}
    >
      {header}
      <Box sx={{ mx: 1 }}>
        {tabs}
      </Box>
      <MUIDialogContent sx={{ height: 1, p: 1 }}>
        {content}
      </MUIDialogContent>
      <MUIDialogActions>
        {actions}
      </MUIDialogActions>
    </MUIDialog>
  )
}

interface DialogContentProps {
  tab: number
}

export const DialogContent = (props: DialogContentProps) => {
  const { tab } = props

  const {
    setValue, register, watch, getValues, trigger, handleSubmit, control, formState: { errors, isValid },
  } = useForm<UseFormProps>({
    defaultValues: {
      category: { value: "" },
      caption: "",
      description: "",
    },
  })

  const caption = watch("caption")
  const category = watch("category")

  useEffect(() => {
    trigger(["category", "caption"])
    handleSubmit(console.log)()
  }, [category, caption])

  return (
    <>
      <TabPanel value={tab} index={0}>
        <Parameters
          control={control}
          errors={errors}
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Description
          watch={watch}
          errors={errors}
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
      </TabPanel>
    </>
  )
}

export const Dialog = () => {
  const [open, setOpen] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [tab, setTab] = useState(0)

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }, [])

  return (
    <DialogLayout
      open={open}
      fullScreen={fullScreen}
      header={(
        <DialogHeader
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      )}
      tabs={(<Tabs tab={tab} onChange={handleChange} />)}
      content={(
        <DialogContent tab={tab} />
      )}
      actions={(<DialogActions isValid={false} onClose={setOpen} />)}
    />
  )
}
