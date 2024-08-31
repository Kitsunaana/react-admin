import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { ChangeBgColor } from "../photo-position/forms/input-bgcolor"
import { InputTextColor } from "../photo-position/forms/input-text-color"
import { ChangeBlur } from "../photo-position/forms/slider-blur"
import { Gallery } from "../photo-position/gallery/gallery"
import { CheckboxShowPhoto } from "../photo-position/forms/checkbox-show-photo"

export const TabPhotoPosition = () => (
  <Box sx={{ mt: 1 }}>
    <CheckboxShowPhoto />
    <Box flex ai row jc_sp gap>
      <ChangeBgColor />
      <InputTextColor />
      <Box sx={{ width: 1 }}>
        <Text name="forms.effectBlur" />
        <Box sx={{ px: 2 }}>
          <ChangeBlur />
        </Box>
      </Box>
    </Box>

    <Text sx={{ mb: 1 }} name="positionInContainer" />
    <Gallery />
  </Box>
)
