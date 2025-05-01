import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './database-config/database-config.module';

@Module({
  imports: [
    // Added config module to manage environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
