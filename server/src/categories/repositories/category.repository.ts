import { Category } from '../../entities/category.entity';
import { IPostCategoryInput } from '../dto/inputs/post-category.input';
import { v4 as uuidv4 } from 'uuid';
import {
  CategoryRepositoryImpl,
  IUpdateCategoryPayload,
  IGetAllCategoryParams,
} from '../interfaces/category.repository.interface';
import { CategoryGetAllCommandImpl } from '../interfaces/category-get-all.command.interface';
import { CategoryGetByIdCommandImpl } from '../interfaces/category-get-by-id.command.interface';

export class CategoryRepository implements CategoryRepositoryImpl {
  public constructor(
    private categoryGetAll: CategoryGetAllCommandImpl,
    private categoryGetById: CategoryGetByIdCommandImpl,
    private categoryEntity: typeof Category,
  ) {}

  public async count(): Promise<number> {
    return await this.categoryEntity.count();
  }

  public async getAll(query: IGetAllCategoryParams): Promise<Category[]> {
    return await this.categoryGetAll.execute(query);
  }

  public async getById(id: string): Promise<Category> {
    return await this.categoryGetById.execute(id).then((category) => category.get({ plain: true }));
  }

  public async create(dto: IPostCategoryInput): Promise<Category> {
    return await this.categoryEntity
      .create({
        order: 0,
        caption: dto.caption,
        description: dto.description,
        id: uuidv4(),
      })
      .then((category) => category.get({ plain: true }));
  }

  public async update(payload: IUpdateCategoryPayload): Promise<[number, Category[]]> {
    return await this.categoryEntity.update(payload, {
      returning: true,
      where: {
        id: payload.id,
      },
    });
  }

  public async remove(id: string): Promise<number> {
    return await this.categoryEntity.destroy({
      where: {
        id,
      },
    });
  }
}
