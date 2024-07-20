import React, { memo } from "react"
import { Icon, IconProps } from "@mui/material"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/Store"

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
}

interface DefaultIcon extends IconProps{
  name: string
}

const Default = memo((props: DefaultIcon) => {
  const { name, ...other } = props

  const weight = useAppSelector((state: RootState) => state.settings.weightIcon)
  const fill = useAppSelector((state: RootState) => state.settings.fillIcon)

  const icon = iconData[name] ?? iconData.defIcon

  return (
    <Icon
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
      }}
      {...other}
    >
      {icon}
    </Icon>
  )
})

export { Default as Icon }
