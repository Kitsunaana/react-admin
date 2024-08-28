import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { ChangeBgColor } from "../photo-position/forms/photo-input-bgcolor"
import { PhotoInputTextColor } from "../photo-position/forms/photo-input-text-color"
import { ChangeBlur } from "../photo-position/forms/photo-slider-blur"
import { Gallery } from "../photo-position/gallery/gallery"
import { PhotoCheckboxShowPhoto } from "../photo-position/forms/photo-checkbox-show-photo"

export const TabPhotoPosition = () => (
  <Box sx={{ mt: 1 }}>
    <PhotoCheckboxShowPhoto />
    <Box flex ai row jc_sp gap>
      <ChangeBgColor />
      <PhotoInputTextColor />
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
