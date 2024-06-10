// src/database/database.module.ts

import { Module, Global } from '@nestjs/common';
import knex from 'knex';
import { KNEX_CONNECTION } from './constant';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: KNEX_CONNECTION,
      useFactory: async (configService: ConfigService) => knex({
        client: 'pg',
        connection: {
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME')
        },
      }),
      inject: [ConfigService],
    },
  ],
  exports: [KNEX_CONNECTION], // Make sure this matches the provider token
})
export class DatabaseModule {}
