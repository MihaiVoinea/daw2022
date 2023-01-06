import { z } from 'zod';
import dbConfigSchema from './db.config';

const envSchema = z
  .object({
    NODE_ENV: z.enum(['local', 'prod']).default('prod'),
    FRONTEND_URL: z.string(),
    API_URL: z.string(),
  })
  .merge(dbConfigSchema);

export const validate = (
  config: Record<string, unknown>,
): z.infer<typeof envSchema> => envSchema.parse(config);
