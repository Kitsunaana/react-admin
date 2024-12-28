import { Tag } from 'src/shared/types/types';

export interface TagStrategy {
  getAll(): Promise<string[]>;
  create(payload: Tag, ownerId: string): Promise<void>;
  update(payload: Tag): Promise<void>;
  remove(payload: Tag): Promise<void>;
  delete(ownerId: string): Promise<void>;
}
