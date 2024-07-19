import { Box } from "shared/ui/Box"
import {
  alpha, Fade, Grow,
  IconButton, Pagination, Zoom,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import React, {
  useEffect,
} from "react"
import { Input } from "shared/ui/Input"
import { Select } from "shared/ui/Select"
import { useForm } from "react-hook-form"
import { Text } from "shared/ui/Text"

import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import { TransitionGroup } from "react-transition-group"
import { Divider, Vertical } from "shared/ui/Divider"

interface Option {
  id?: number
  value: string
  icon?: string
  default?: boolean
}

export interface UseFormProps {
  filterByCategory: Option
  filterByTypeGood: Option
  search: string
}

const GoodsPage = () => {
  const {
    register, handleSubmit, watch, setValue, formState: { errors }, getValues,
  } = useForm<UseFormProps>({
    defaultValues: {
      filterByCategory: { value: "" },
      filterByTypeGood: { value: "" },
      search: "",
    },
  })

  const onSubmit = (data: UseFormProps) => {
    // console.log(data)
  }

  const search = watch("search")
  const filterByCategory = watch("filterByCategory")
  const filterByTypeGood = watch("filterByTypeGood")

  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [search, filterByCategory, filterByTypeGood])

  return (
    <Box flex jc_sp sx={{ height: 1 }}>
      <Box flex gap sx={{ p: 1 }}>
        <Box flex row ai gap>
          <Input
            {...register("search")}
            sx={{ flexGrow: 1 }}
            size="small"
            label="Поиск"
          />
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
            value={getValues("filterByCategory")}
            setValue={setValue}
            inputProps={{ size: "small", label: "Категория" }}
            options={[{ id: 1, value: "option1" }, { id: 2, value: "option2" }]}
            {...register("filterByCategory")}
          />

          <Select
            clear
            value={getValues("filterByTypeGood")}
            setValue={setValue}
            {...register("filterByTypeGood")}
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
      <Box
        sx={{
          height: 1,
          mx: 1,
          borderRadius: 1,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {new Array(100).fill(100).map((_, index) => index).map((item) => (

          <Accordion
            defaultExpanded={item === 0}
            key={item}
            sx={{
              border: ({ palette }) => `1px solid ${palette.grey["600"]}`,
              backgroundImage: ({ background }) => background.sectionBackground,
              boxShadow: "0px 0px 0px rgba(0,0,0,0)",
              "&.Mui-expanded": {
                my: 1,
                borderRadius: 1,
              },
            }}
          >
            <AccordionSummary
              sx={{
                px: 1,
                "& .MuiAccordionSummary-content": {
                  my: 0,
                  py: 0.5,

                  "&.Mui-expanded": {
                    my: 0,
                  },
                },
                "&.Mui-expanded": {
                  minHeight: "unset",
                },
              }}
            >
              <Box flex row jc_sp ai sx={{ width: 1 }}>
                <Box>
                  <Text caption="Ананас" />
                  <Text
                    sx={{
                      fontSize: 12,
                    }}
                    langBase="goods.table.row"
                    name="category"
                    value="Экзотические фрукты"
                    translateOptions={{
                      components: {
                        strong: <strong
                          style={{
                            fontWeight: "unset",
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                            padding: "2px 8px",
                            display: "inline-flex",
                            borderRadius: "4px",
                          }}
                        />,
                      },
                    }}
                  />
                </Box>
                <Box flex ai row sx={{ height: 1 }}>
                  <Text
                    sx={{ mr: 1, fontSize: 14 }}
                    caption={(
                      <strong
                        style={{
                          fontWeight: "unset",
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          padding: "2px 8px",
                          display: "inline-flex",
                          borderRadius: "4px",
                        }}
                      >
                        new
                      </strong>
                    )}
                  />
                  <Text
                    sx={{ mr: 1, fontSize: 14 }}
                    caption={(
                      <strong
                        style={{
                          fontWeight: "unset",
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          padding: "2px 8px",
                          display: "inline-flex",
                          borderRadius: "4px",
                        }}
                      >
                        hot
                      </strong>
                    )}
                  />
                  <IconButton sx={{ p: 0.5 }} onClick={(event) => event.stopPropagation()}>
                    <Icon
                      sx={{
                        fontSize: 20,
                        color: ({ palette }) => palette.secondary.main,
                      }}
                      name="image"
                    />
                  </IconButton>
                  <Vertical sx={{ mx: 0.75 }} />
                  <IconButton
                    sx={{
                      p: 0.5,
                      mr: 1,
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Icon sx={{ fontSize: 20 }} name="stopList" />
                  </IconButton>
                  <IconButton sx={{ p: 0.5 }} onClick={(event) => event.stopPropagation()}>
                    <Icon sx={{ fontSize: 20 }} name="additional" />
                  </IconButton>
                  <Vertical sx={{ mx: 0.75 }} />
                  <Box sx={{ mx: 0.25 }}>
                    26
                  </Box>
                  <Vertical sx={{ mx: 0.75 }} />
                  <IconButton sx={{ p: 0.25, borderRadius: 1 }} onClick={(event) => event.stopPropagation()}>
                    <Icon sx={{ fontSize: 28, color: ({ palette }) => palette.primary.main }} name="actions" />
                  </IconButton>
                  <Vertical sx={{ mx: 0.75 }} />
                  <IconButton sx={{ p: 0.5 }}>
                    <Icon sx={{ fontSize: 20 }} name="expand" />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Divider textAlign="right">Прайс-лист</Divider>
              <Box
                flex
                row
                ai
                gap
                sx={{
                  borderRadius: 0.5,
                  borderLeft: ({ palette }) => `5px solid ${palette.success.main}`,
                  pl: 1,
                }}
              >
                <Icon sx={{ fontSize: 20 }} name="folder" />
                <Text
                  langBase="goods.table.row"
                  name="price"
                  value="Основной прайс"
                  translateOptions={{
                    components: {
                      strong: <strong
                        style={{
                          fontWeight: "unset",
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          padding: "2px 8px",
                          display: "inline-flex",
                          borderRadius: "4px",
                        }}
                      />,
                    },
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box
        flex
        row
        jc_sp
        ai
        sx={{
          p: 1,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Box />
        <Box flex ai row gap>
          <Text langBase="table.bottom" name="count" />
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: ({ palette }) => alpha(palette.grey["700"], 0.5),
            }}
          >
            79
          </Box>
          <Pagination
            count={3}
            variant="outlined"
            shape="rounded"
            onChange={(event, page) => {
              console.log(page)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default GoodsPage
