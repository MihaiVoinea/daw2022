import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: EntityRepository<Event>,
  ) {}

  public async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(createEventDto);
    await this.eventsRepository.persistAndFlush(event);

    return event;
  }

  public async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({});
  }

  public async findOne(eventId: string): Promise<Event> {
    return this.eventsRepository.findOneOrFail({ id: eventId });
  }

  public async update(
    event: Event,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    this.eventsRepository.assign(event, updateEventDto);
    await this.eventsRepository.persistAndFlush(event);

    return event;
  }

  public async remove(event: Event): Promise<void> {
    await this.eventsRepository.remove(event).flush();
  }
}
