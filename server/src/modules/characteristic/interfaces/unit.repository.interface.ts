import { Unit } from '../domain/units.entity';

export interface IUnitRepositoryImpl {
  getAll(): Promise<Unit[]>;
  findOrCreate(caption: string | null): Promise<Unit>;
  removeUnused(): Promise<number>;
}
