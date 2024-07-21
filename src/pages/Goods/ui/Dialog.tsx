import * as React from "react"
import Button from "@mui/material/Button"
import MUIDialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { Box } from "shared/ui/Box"
import { Text } from "shared/ui/Text"
import {
  alpha, IconButton, Tab, Tabs, TextField,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { Select } from "shared/ui/Select"
import { Input } from "shared/ui/Input"
import {
  FormState,
  useForm, UseFormGetValues, UseFormRegister, UseFormSetValue,
} from "react-hook-form"
import { Option } from "pages/Goods/ui/Header"

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
}

interface ParametersProps {
  errors: FormState<UseFormProps>["errors"]
  register: UseFormRegister<UseFormProps>
  getValues: UseFormGetValues<UseFormProps>
  setValue: UseFormSetValue<UseFormProps>
}

export const Parameters = (props: ParametersProps) => {
  const {
    errors, register, getValues, setValue,
  } = props

  return (
    <DialogContent>
      <Select
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
      />
      <Input
        label="Заголовок"
        size="small"
        fullWidth
        {...register("caption", {
          required: "required",
          minLength: { value: 3, message: "minLength" },
        })}
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
    </DialogContent>
  )
}

interface DescriptionProps extends ParametersProps {}

export const Description = (props: DescriptionProps) => {
  const {
    errors, register, getValues, setValue,
  } = props

  return (
    <DialogContent sx={{ height: 1, p: 1 }}>
      {/* <Input
        fullWidth
        label="Описание"
        multiline
        sx={{
          height: 1,
          "& .MuiInputBase-root": { height: 1 },
        }}
      /> */}
      Textarea
    </DialogContent>
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

const categoryList = [{ id: 0, value: "category1" }, { id: 2, value: "category2" }]

export const Dialog = () => {
  const [open, setOpen] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)

  const [tab, setTab] = useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onToggleFullScreen = () => {
    setFullScreen((prevState) => !prevState)
  }

  const {
    setValue, register, watch, getValues, handleSubmit, formState: { errors, isValid },
  } = useForm<UseFormProps>({
    defaultValues: {
      category: { value: "" },
      caption: "",
    },
  })

  const category = watch("category")
  const caption = watch("caption")

  useEffect(() => {
    handleSubmit(console.log)()
  }, [caption, category])

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
          onClick={onToggleFullScreen}
        >
          <Icon
            name={fullScreen ? "fullscreenClose" : "fullscreenOpen"}
          />
        </IconButton>
      </Box>
      <Box sx={{ mx: 1 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
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
                <Box flex ai gap row>
                  <Icon name={tab?.icon} sx={{ fontSize: 20 }} />
                  <Text caption={tab.caption} sx={{ fontSize: 14, textTransform: "none" }} />
                </Box>
              )}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Parameters
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          register={register}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Description
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          register={register}
        />
      </TabPanel>
      <DialogActions>
        <Button disabled={!isValid} onClick={handleClose}>
          Сохранить
        </Button>
        <Button onClick={handleClose} autoFocus>
          Отмена
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}
