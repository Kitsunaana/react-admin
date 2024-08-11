export interface Order {
  id: number
  order: number
}

export interface UseFormProps {
  caption: string;
  description: string;
  orders: Order[]
}

export interface ITab {
  id: number
  caption: string
  icon: string
  content?: string[]
}
