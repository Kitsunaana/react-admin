import { z } from 'zod';

export interface IAltNameCommon {
  id: string;
  caption: string;
  description: string;
  status: 'update' | 'create' | 'remove' | 'none';
  locale: {
    id: string;
    altName: string;
    caption: string;
    code: string;
  };
}

export const altNameCommonSchema = z.object({
  id: z.string(),
  caption: z.string(),
  description: z.string(),
  status: z.enum(['update', 'create', 'remove', 'none']),
  locale: z.object({
    id: z.string(),
    altName: z.string(),
    caption: z.string(),
    code: z.string(),
  }),
});
