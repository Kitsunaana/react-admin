import { Category } from '../domain/category.entity';
import { IPostCategoryInput } from '../dto/inputs/post-category.input';

export interface IUpdateCategoryPayload {
  id: string;
  caption: string;
  description: string;
}

export interface IGetAllCategoryParams {
  search: string | undefined;
  limit: number;
  page: number;
}

export interface CategoryRepositoryImpl {
  getAll(query: IGetAllCategoryParams): Promise<Category[]>;
  getById(id: string): Promise<Category>;

  create(dto: IPostCategoryInput): Promise<Category>;
  update(payload: IUpdateCategoryPayload): Promise<[number, Category[]]>;
  remove(id: string): Promise<number>;

  count(): Promise<number>;
}
