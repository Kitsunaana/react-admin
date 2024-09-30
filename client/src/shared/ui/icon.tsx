import { forwardRef } from "react"
import {
  Fade,
  Icon, IconProps, Tooltip, TooltipProps,
} from "@mui/material"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"

const iconData = {
  defIcon: "do_not_disturb_off",
  catalog: "account_tree",
  goods: "fastfood",
  additional: "folder_special",
  stopList: "do_not_touch",
  pricing: "request_quote",
  priceList: "attach_money",
  promoCode: "celebration",
  orders: "receipt_long",
  newOrder: "list_alt_add",
  clients: "groups",
  analysis: "badge",
  chat: "forum",
  favorite: "favorite",
  expand: "expand_more",
  light: "light_mode",
  system: "settings_brightness",
  dark: "nightlight",
  users: "admin_panel_settings",
  settings: "format_paint",
  clear: "close",
  typeGood: "fastfood",
  consumable: "texture_add",
  actions: "more_vert",
  image: "image",
  folder: "folder_open",
  edit: "edit",
  copy: "content_copy",
  delete: "delete",
  reload: "sync",
  back: "undo",
  add: "post_add",
  fullscreenOpen: "fullscreen",
  fullscreenClose: "fullscreen_exit",
  done: "done",
  warning: "warning",
  description: "speaker_notes",
  paste: "content_paste",
  empty: "wb_iridescent",
  prev: "arrow_back_ios",
  next: "arrow_forward_ios",
  setDefaultParameters: "reset_image",
  imageScaleUp: "zoom_in",
  imageScaleDown: "zoom_out",
  rotateLeft: "rotate_left",
  rotateRight: "rotate_right",
  infinity: "all_inclusive",
  zoomEffect: "pinch_zoom_in",
  allowCategory: "account_tree",
  invisible: "visibility_off",
  translate: "g_translate",
  file: "file_download",
  photo: "image",
  positionPhoto: "compare",
  characteristic: "extension",
  alternativeName: "signature",
  tags: "loyalty",
  arrowRight: "navigate_next",
  settings_v2: "settings",
}

export type IconKeys = keyof typeof iconData

interface DefaultIcon extends IconProps {
  name?: IconKeys | string
  help?: Omit<TooltipProps, "children">
}

const Default = forwardRef<any, DefaultIcon>((props, ref) => {
  const { name = "", help, ...other } = props

  const weight = useAppSelector((state: RootState) => state.settings.weightIcon)
  const fill = useAppSelector((state: RootState) => state.settings.fillIcon)

  const icon = other.children ?? (
    name in iconData
      ? iconData[name as IconKeys]
      : iconData.defIcon
  )

  const renderIcon = (
    <Fade in className="material-symbols-outlined">
      <Icon
        ref={ref}
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        }}
        {...other}
      >
        {icon}
      </Icon>
    </Fade>
  )

  if (help) {
    return (
      <Tooltip {...help}>
        {renderIcon}
      </Tooltip>
    )
  }

  return renderIcon
})

export { Default as Icon }
