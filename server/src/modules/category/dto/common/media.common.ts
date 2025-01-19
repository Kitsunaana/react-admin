import { z } from 'zod';

export interface IMediaCommon {
  id: string;
  caption: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
  order: number;
}

export const mediaCommonSchema = z.object({
  id: z.string(),
  filename: z.string(),
  mimetype: z.string(),
  originalName: z.string(),
  path: z.string(),
  size: z.number().int().positive(),
  order: z.number().nullable(),
  delete: z.boolean().optional(),
});
