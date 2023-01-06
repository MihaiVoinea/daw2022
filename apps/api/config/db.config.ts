import { z } from 'zod';

const dbConfigSchema = z.object({
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.number().default(5432),
});

export default dbConfigSchema;
