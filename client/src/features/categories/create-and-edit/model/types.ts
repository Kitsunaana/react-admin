export interface Option {
  value: string | null;
  icon?: string;
  tab?: number;
}

export interface UseFormProps {
  caption: string;
  description: string;
}

export interface ITab {
  id: number
  caption: string
  icon: string
  content?: string[]
}
