export type MenuItemBase = {
  id: number;
  name: string;
  caption: string;
  icon: string;
};

export type MenuItem = { disabled?: boolean } & MenuItemBase;

export type MenuList = { sublist: MenuItem[] } & MenuItemBase;
