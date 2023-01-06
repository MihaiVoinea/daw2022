import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate as validateConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
      envFilePath: '../../.env',
    }),

    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        dbName: configService.get('DB_NAME'),
        type: 'postgresql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        user: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        debug: configService.get('NODE_ENV') === 'development',
        findOneOrFailHandler(entityName): Error {
          throw new NotFoundException(`${entityName} not found.`);
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
