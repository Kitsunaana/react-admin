import { FormControlLabel, Slider } from "@mui/material"
import { Controller } from "react-hook-form"
import { ColorInput } from "shared/ui/form/input-color"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { CategoryFields } from "shared/types/new_types/types"
import {
  IsShowPhotoWithGoods,
  ContainerInputs,
  EffectBlurBox,
  SliderBox,
} from "./styles"
import { usePhotoPositionForm } from "../../../../view-model/form/use-photo-position-form"

export const Form = ({ defaultValue }: { defaultValue: CategoryFields }) => {
  const photoPositionForm = usePhotoPositionForm()

  return (
    <>
      <FormControlLabel
        label={<Text onlyText name="forms.showPhotoInListGoods" />}
        control={(
          <Controller
            name="isShowPhotoWithGoods"
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
}
