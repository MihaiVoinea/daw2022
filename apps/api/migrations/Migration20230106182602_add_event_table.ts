import { Migration } from '@mikro-orm/migrations';

export class Migration20230106182602 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      create extension if not exists "uuid-ossp";
    `);
    this.addSql(
      'create table "event" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "date" timestamptz(0) not null, "location" varchar(255) not null, constraint "event_pkey" primary key ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "event" cascade;');
  }
}
