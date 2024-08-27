import { RowItem } from "shared/ui/row-item"
import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import React, { forwardRef, ReactNode } from "react"
import {
  Autocomplete, TextField, useAutocomplete, useTheme,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { observer } from "mobx-react-lite"
import { makeAutoObservable, toJS } from "mobx"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { Icon } from "shared/ui/icon"
import {
  FormProvider, useForm, useFormContext, Controller,
} from "react-hook-form"
import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import { Input } from "shared/ui/form/input"
import { SelectItem } from "shared/ui/form/select"
import { FixedSizeList as List } from "react-window"
import { ListboxComponent, Virtualize } from "features/categories/create-and-edit/ui/virt"
import { ColorInput } from "features/categories/create-and-edit/ui/tabs/photo-position"
import { nanoid } from "nanoid"
import { useQuery } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"
import { z } from "zod"
import { DialogDelete } from "shared/ui/dialog/dialog-delete"
import icons from "./icons.json"

const CharacteristicsContainer = styled((props: BoxProps & { fullScreen: boolean }) => {
  const { fullScreen, ...other } = props
  return <Box {...other} />
})`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
  height: ${({ fullScreen }) => (fullScreen ? "calc(100% - 60px)" : "432px")};
`

/* "tags": [
  {
    "id": 1,
    "icon": "fastfood",
    "tagColor": "#000",
    "tag": {
      "id": 1,
      "caption": "Google"
    }
  }
] */
export const tagSchema = z.object({

})

interface ITag {
  id: string | number

  tag: {caption: string}
  icon: string | null
  tagColor: string

  edited?: boolean
  local?: boolean
  action: "create" | "update" | "remove"
}

interface ITagCreate {
  tag: {caption: string}
  icon: string | null
  tagColor: string
}

interface ITagEdit extends ITagCreate {
  id: string | number
}

export class TagsStore {
  tags: ITag[] = [
    /* {
      id: "1", tag: { caption: "Google" }, icon: "fastfood", tagColor: "#000", local: true, action: "create",
    }, */
  ]

  getData() {
    return {
      tags: this.tags.map(({ id, local, ...other }) => ({
        ...other,
        ...(typeof id === "number" && !local ? { id } : {}),
      })),
    }
  }

  setTags(tags: any) {
    this.tags = tags
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  get filteredTags() {
    return this.tags.filter((tag) => tag.action !== "remove")
  }

  create(data: ITagCreate) {
    this.tags.push({
      ...data, local: true, action: "create", id: nanoid(),
    })
  }

  edit(data: ITagEdit) {
    this.tags = this.tags
      .map((item) => {
        if (item.id === data.id) {
          return {
            ...item, ...data, edited: true, action: item.local ? "create" : "update",
          }
        }

        return item
      })
  }

  remove(id: number | string) {
    this.tags = this.tags.map((tag) => {
      if (tag.id === id) {
        return tag.local ? null : { ...tag, action: "remove" }
      }

      return tag
    }).filter((item): item is ITag => item !== null)
  }
}

interface TagProps extends BoxProps {
  color?: string
  caption: string
  icon: string | null
}

export const Tag = styled((props: TagProps) => {
  const {
    color, caption, icon, ...other
  } = props

  const { palette } = useTheme()

  const contrastColor = palette.getContrastText(color || "rgb(255, 183, 77)")

  return (
    <Box {...other} style={{ backgroundColor: color || "rgb(255, 183, 77)" }}>
      {icon && <Icon sx={{ color: contrastColor }} fontSize="small">{icon}</Icon>}
      <Text sx={{ color: contrastColor }} caption={caption} />
    </Box>
  )
})`
  padding-left: 14px;
  padding-right: 14px;
  min-height: 24px;
  background: ${({ color }) => color ?? "rgb(255, 183, 77)"};
  position: relative;
  clip-path: polygon(calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%, 8px 50%, 0% 0%);
  display: inline-flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
`

export const useTags = () => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["tags"],
    queryFn: () => $axios.get("/tags").then(({ data }) => data),
  })

  return {
    tagsData: data,
    tagsIsLoading: isLoading || isPending,
  }
}

export const TagEditForm = () => {
  const { getValues, watch, trigger } = useFormContext()

  const caption = watch("tag.caption") ?? getValues("tag.caption")
  const icon = watch("icon") ?? getValues("icon")
  const tagColor = watch("tagColor") ?? getValues("tagColor")

  const { tagsData, tagsIsLoading } = useTags()

  if (tagsIsLoading) return <Box>Loading</Box>

  return (
    <Box flex ai gap grow sx={{ p: 1 }}>
      <Box flex row jc>
        <Tag caption={caption} icon={icon} color={tagColor} />
      </Box>

      <Controller
        name="tag.caption"
        rules={{ required: "Должно быть выбрано" }}
        render={({ field, fieldState }) => (
          <Autocomplete
            size="small"
            freeSolo
            fullWidth
            value={field.value}
            onChange={(event, option) => {
              field.onChange(option)
              trigger("tag.caption")
            }}
            options={tagsData.map((item) => item.caption)}
            renderInput={(props) => (
              <Input
                {...props}
                {...field}
                onChange={(event) => {
                  field.onChange(event)
                  trigger("tag.caption")
                }}
                label="Тег"
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
            renderOption={({ key, ...other }, option) => (
              <SelectItem key={key} {...other}>
                {option}
              </SelectItem>
            )}
          />
        )}
      />

      <Box flex row gap sx={{ width: 1 }}>
        <Controller
          name="icon"
          render={({ field }) => (
            <Autocomplete
              size="small"
              id="virtualize-demo"
              sx={{ width: "70%" }}
              value={field.value}
              onChange={(event, option) => field.onChange(option)}
              disableListWrap
              ListboxComponent={ListboxComponent}
              options={icons}
              renderInput={(params) => (
                <Input
                  {...params}
                  label="Иконка"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: field.value ? (
                      <Icon sx={{ width: 23, height: 23 }}>{field.value}</Icon>
                    ) : null,
                  }}
                />
              )}
              renderOption={(props, option, state) => [props, option, state.index] as React.ReactNode}
            />
          )}
        />

        <Controller
          name="tagColor"
          render={({ field }) => (
            <ColorInput
              {...field}
              sx={{ width: "30%" }}
              label="Цвет"
              PopoverProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  )
}

export const TagDialog = () => {
  const store = useEditDialogStore()
  const { tags } = useStores()

  const methods = useForm({
    defaultValues: {
      tag: { caption: null },
      icon: null,
      tagColor: "rgb(255, 183, 77)",
    },
  })

  return (
    <FormProvider {...methods}>
      <DialogEdit
        size="auto"
        langBase="tags"
        onSave={tags.create}
        onEdit={tags.edit}
        container={<TagEditForm />}
        PaperProps={{
          sx: {
            maxWidth: store.fullScreen ? "95%" : 840,
            maxHeight: "95%",
          },
        }}
      />
    </FormProvider>
  )
}

export const TagDialogDelete = () => {
  const { tags } = useStores()

  return (
    <DialogDelete
      langBase="tags"
      onDeleteLocal={tags.remove}
    />
  )
}

export const Tags = observer(() => {
  const { tags } = useStores()

  console.log(JSON.parse(JSON.stringify(tags.filteredTags)))

  const { fullScreen, openDialog: openEditDialog } = useEditDialogStore()
  const { openDialog: openDeleteDialog } = useDeleteDialogStore()

  const theme = useTheme()

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {tags.filteredTags.length > 0 ? (
          <CharacteristicsContainer fullScreen={fullScreen}>
            {tags.filteredTags.map((tag) => (
              <RowItem key={tag.id} theme={theme} success={tag.edited || tag.local}>
                <Tag caption={tag.tag.caption} icon={tag.icon} color={tag.tagColor} />

                <Box flex row ai>
                  <Vertical />
                  <IconButtonEdit onClick={() => openEditDialog(tag.id, tag)} />
                  <IconButtonDelete onClick={() => openDeleteDialog(tag.id, {
                    caption: tag.tag.caption,
                  })}
                  />
                </Box>
              </RowItem>
            ))}
          </CharacteristicsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <IconButton
            name="add"
            help={{ title: "Создать", arrow: true }}
            onClick={() => openEditDialog(null)}
          />
        </Box>
      </Box>

      <TagDialog />
      <TagDialogDelete />
    </>
  )
})
