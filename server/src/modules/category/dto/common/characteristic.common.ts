import { z } from 'zod';

export interface ICharacteristicCommon {
  id: string;
  caption: string;
  hideClient: boolean;
  unit: string | null;
  value: string;
  status: 'update' | 'create' | 'remove' | 'none';
}

export const characteristicCommonSchema = z.object({
  id: z.string(),
  caption: z.string(),
  hideClient: z.boolean(),
  unit: z.string().nullable(),
  value: z.string(),
  status: z.enum(['update', 'create', 'remove', 'none']),
});
