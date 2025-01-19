export interface ITag {
  id: string;
  caption: string;
  color: string;
  icon: string | null;
  status: 'update' | 'create' | 'remove' | 'none';
}
