import { IGetAllCategoryParams } from './category.repository.interface';
import { Category } from '../../entities/category.entity';

export interface CategoryGetAllCommandImpl {
  execute(query: IGetAllCategoryParams): Promise<Category[]>;
}
