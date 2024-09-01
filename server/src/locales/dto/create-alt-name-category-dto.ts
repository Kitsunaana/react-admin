export class CreateAltNameCategoryDto {
  id?: number;
  caption: string;
  description: string | null;
  action?: 'create' | 'update' | 'remove';
  locale: {
    id: number;
    caption: string;
    altName: string;
    code: string;
  };
}
