export type MenuItemBase = {
  id: number;
  name: string;
  caption: string;
  path: string;
  icon: string;
  disabled?: boolean
};

export type MenuItem = {} & MenuItemBase;

export type MenuList = {
  sublist: MenuItem[],
} & MenuItemBase;
