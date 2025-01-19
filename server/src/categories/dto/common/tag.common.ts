import { z } from 'zod';

export interface ITagCommon {
  id: string;
  caption: string;
  color: string;
  icon: string | null;
  status: 'update' | 'create' | 'remove' | 'none';
}

export const tagCommonSchema = z.object({
  id: z.string(),
  caption: z.string(),
  color: z.string(),
  icon: z.string().nullable(),
  status: z.enum(['update', 'create', 'remove', 'none']),
});
