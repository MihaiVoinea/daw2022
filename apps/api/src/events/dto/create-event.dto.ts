import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const createEventSchema = extendApi(
  z.object({
    name: z.string(),
    description: z.string(),
    date: z.string().datetime({ precision: 0 }),
  }),
);

export class CreateEventDto extends createZodDto(createEventSchema) {}
