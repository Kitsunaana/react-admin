import { Category } from '../domain/category.entity';

export interface CategoryGetByIdCommandImpl {
  execute(id: string): Promise<Category>;
}
