export type ILocale = {
  id: string;
  altName: string;
  caption: string;
  code: string;
};

export type IAltName = {
  id: string;
  caption: string;
  description: string;
  locale: ILocale;
  status: 'update' | 'create' | 'remove' | 'none';
};
