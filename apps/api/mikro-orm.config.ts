import { MikroORMOptions } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { config as dotenv } from 'dotenv';
dotenv({ path: '../../.env' });

export default {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'postgresql',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  highlighter: new SqlHighlighter(),
  debug: true,
  implicitTransactions: true,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 30000,
  },
  migrations: {
    path: 'dist/migrations',
    pathTs: 'migrations',
  },
} as MikroORMOptions | MikroOrmModuleOptions;
