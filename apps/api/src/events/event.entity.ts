import { Entity, PrimaryKey, Property, types } from '@mikro-orm/core';

class BaseEntity {
  @PrimaryKey({
    type: types.uuid,
    defaultRaw: 'uuid_generate_v4()',
    nullable: false,
  })
  id!: string;

  @Property()
  createdAt?: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt?: Date = new Date();
}

@Entity()
export class Event extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  date!: Date;

  @Property()
  location!: string;
}
