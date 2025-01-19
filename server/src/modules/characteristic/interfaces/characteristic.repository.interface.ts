import { Characteristic } from '../domain/characteristic.entity';

export interface ICharacteristicRepositoryImpl {
  getAll(): Promise<Characteristic[]>;
  findOrCreate(caption: string): Promise<Characteristic>;
  removeById(id: string): Promise<number>;
  removeUnused(): Promise<number>;
}
