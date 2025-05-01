// src/database-config/database-config.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        type: 'postgres',
        host: databaseConfigService.host,
        port: databaseConfigService.port,
        username: databaseConfigService.username,
        password: databaseConfigService.password,
        database: databaseConfigService.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
        ssl: databaseConfigService.ssl ? { rejectUnauthorized: false } : false,
      }),
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
