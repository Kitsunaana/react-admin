import React, { memo } from "react"
import { Icon, IconProps } from "@mui/material"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/Store"

const iconData = {
  defIcon: "do_not_disturb_off",
  catalog: "account_tree",
  goods: "fastfood",
  additional: "folder_special",
  warehouses: "warehouse",
  coming: "place_item",
  moving: "swap_horiz",
  consumption: "flip_to_back",
  document: "picture_as_pdf",
  stopList: "do_not_touch",
  pricing: "request_quote",
  priceList: "attach_money",
  priceListDelivery: "local_shipping",
  promoCode: "celebration",
  orders: "receipt_long",
  newOrder: "list_alt_add",
  clients: "groups",
  analysis: "badge",
  chat: "forum",
  favorite: "favorite",
  deliveryAddresses: "home_pin",
  bot: "smart_toy",
  departments: "diversity_3",
  groups: "groups",
  marketing: "cell_tower",
  expand: "expand_more",
  light: "light_mode",
  system: "settings_brightness",
  dark: "nightlight",
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
