export interface Option {
  value: string | null;
  icon?: string;
  tab?: number;
}

export interface UseFormProps {
  caption: Option;
  description: string;
  images: {
    caption: string,
    data: File,
    type: string,
    id: string,
    deleted?: boolean
  }[]
}
