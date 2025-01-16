export type Locale = {
  id: string;
  altName: string;
  caption: string;
  code: string;
};

export type AltName = {
  id: string;
  caption: string;
  description: string;
  locale: Locale;
  status: 'update' | 'create' | 'remove' | 'none';
};
