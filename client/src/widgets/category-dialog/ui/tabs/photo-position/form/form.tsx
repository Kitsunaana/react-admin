import { FormControlLabel, Slider } from "@mui/material"
import { memo } from "react"
import { Controller } from "react-hook-form"
import { ColorInput } from "shared/ui/form/input-color"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { usePhotoPositionForm } from "../../../../view-model/form/use-photo-position-form"
import {
  ContainerInputs,
  EffectBlurBox,
  IsShowPhotoWithGoods,
  SliderBox,
} from "./styles"
import { useCategoryFormContext } from "../../../../view-model/form/use-category-form"

export const Form = memo(() => {
  const defaultValue = useCategoryFormContext((state) => state.defaultValue)
  const control = useCategoryFormContext((state) => state.control)

  const photoPositionForm = usePhotoPositionForm()

  return (
    <>
      <FormControlLabel
        label={<Text onlyText name="forms.showPhotoInListGoods" />}
        control={(
          <Controller
            name="isShowPhotoWithGoods"
            control={control}
            defaultValue={defaultValue.isShowPhotoWithGoods}
            render={({ field }) => (
              <IsShowPhotoWithGoods
                {...field}
                checked={field.value}
                onChange={((event) => photoPositionForm.handleIsShowWithGoodsChange(event, field))}
              />
            )}
          />
        )}
      />

      <ContainerInputs>
        <Controller
          name="bgColor"
          control={control}
          defaultValue={defaultValue.bgColor}
          render={({ field }) => (
            <ColorInput
              {...field}
              fullWidth
              label={<Text onlyText name="forms.bgColor" />}
              onBlur={photoPositionForm.handleBgColorBlur}
            />
          )}
        />

        <Controller
          name="color"
          control={control}
          defaultValue={defaultValue.color}
          render={({ field }) => (
            <ColorInput
              {...field}
              fullWidth
              label={<Text onlyText name="forms.textColor" />}
              onBlur={photoPositionForm.handleColorBlur}
            />
          )}
        />

        <EffectBlurBox>
          <Text name="forms.effectBlur" />
          <SliderBox>
            <Controller
              name="blur"
              control={control}
              defaultValue={defaultValue.blur}
              render={({ field }) => (
                <Slider
                  {...field}
                  max={20}
                  valueLabelDisplay="auto"
                  onBlur={photoPositionForm.handleBlurEffectBlur}
                  onChange={(event) => photoPositionForm.handleBlurEffectChange(event, field)}
                  marks={[
                    {
                      value: 10,
                      label: <Icon name="zoomEffect" fontSize="small" />,
                    },
                  ]}
                />
              )}
            />
          </SliderBox>
        </EffectBlurBox>
      </ContainerInputs>
    </>
  )
})
