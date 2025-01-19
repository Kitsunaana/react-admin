import { Injectable } from '@nestjs/common';
import { IGetAllCategoryInput } from './dto/inputs/get-all-category.input';
import { IPostCategoryInput } from './dto/inputs/post-category.input';
import { PatchOrderCategoryDto } from './dto/inputs/update-order-category.input';
import {
  CategoryCustomRepositoryImpl,
  IUpdateCategoryCustomPayload,
} from './interfaces/category-custom.repository.interface';
import {
  CategoryRepositoryImpl,
  IUpdateCategoryPayload,
} from './interfaces/category.repository.interface';
import { IGetAllCategoriesOutput } from './dto/outputs/get-all-categories.output';
import { IGetByIdCategoryOutput } from './dto/outputs/get-by-id-category.output';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private customRepository: CategoryCustomRepositoryImpl,
    private categoryRepository: CategoryRepositoryImpl,
  ) {}

  public async getAll(query: IGetAllCategoryInput): Promise<IGetAllCategoriesOutput> {
    const count = await this.categoryRepository.count();
    const categories = await this.categoryRepository.getAll({
      page: query.page ? Number(query.page) : 0,
      search: query.search,
      limit: 25,
    });

    return {
      count,
      rows: categories.map((category) => ({
        id: category.id,
        caption: category.caption,
        description: category.description,
        order: category.order,
        media: category.media.map((media) => ({
          id: media.id,
          caption: media.caption,
          originalName: media.originalName,
          path: media.path,
          order: media.order,
          mimetype: media.mimetype,
          size: media.size,
        })),
        altNames: category.altNames.map((altName) => ({
          id: altName.id,
          caption: altName.caption,
          description: altName.description,
          locale: altName.locale,
          status: 'none',
        })),
      })),
    };
  }

  public async getById(id: string): Promise<IGetByIdCategoryOutput> {
    const category = await this.categoryRepository.getById(id);

    return {
      id: category.id,
      order: category.order,

      caption: category.caption,
      description: category.description,

      isShowPhotoWithGoods: category.custom.isShowPhotoWithGoods,
      bgColor: category.custom.bgColor,
      color: category.custom.color,
      blur: category.custom.blur,
      captionPosition: category.custom.captionPosition,
      activeImageId: category.custom.activeImageId,

      media: category.media.map((media) => ({
        id: media.id,
        caption: media.caption,
        originalName: media.originalName,
        path: media.path,
        order: media.order,
        mimetype: media.mimetype,
        size: media.size,
      })),

      characteristics: category.categoryCharacteristics.map(
        ({ characteristic, unit, ...other }) => ({
          id: other.id,
          caption: characteristic.caption,
          unit: unit.caption,
          value: other.value,
          hideClient: other.hideClient,
          status: 'none',
        }),
      ),

      altNames: category.altNames.map((altName) => ({
        id: altName.id,
        caption: altName.caption,
        description: altName.description,
        locale: altName.locale,
        status: 'none',
      })),

      tags: category.tags.map(({ tag, ...other }) => ({
        caption: tag.caption,
        color: other.color,
        icon: other.icon,
        id: other.id,
        status: 'none',
      })),
    };
  }

  public async create(input: IPostCategoryInput): Promise<string> {
    const category = await this.categoryRepository.create(input);
    await this.customRepository.create(input, category.id);

    return category.id;
  }

  public async update(
    input: IUpdateCategoryPayload & IUpdateCategoryCustomPayload,
    id: string,
  ): Promise<Category[]> {
    const category = await this.categoryRepository
      .update({
        id,
        caption: input.caption,
        description: input.description,
      })
      .then((response) => response[1]);

    await this.customRepository.update(input, id);

    return category;
  }

  public async remove(id: string): Promise<number> {
    return await this.categoryRepository.remove(id);
  }

  async updateOrder(input: PatchOrderCategoryDto) {
    /*return await this.categoryRepository.update(
      {
        order: dto.order,
      },
      {
        where: { id: dto.id },
        returning: false,
      },
    );*/
  }
}
