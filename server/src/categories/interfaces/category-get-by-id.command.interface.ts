import { Category } from '../../entities/category.entity';

export interface CategoryGetByIdCommandImpl {
  execute(id: string): Promise<Category>;
}
