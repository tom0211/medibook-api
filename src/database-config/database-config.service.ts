import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('DATABASE_HOST') ?? 'localhost';
  }
  get port(): number {
    return this.configService.get<number>('DATABASE_PORT') ?? 5432;
  }
  get username(): string {
    return this.configService.get<string>('DATABASE_USER') ?? 'postgres_User';
  }
  get password(): string {
    return (
      this.configService.get<string>('DATABASE_PASSWORD') ?? 'postgres_Password'
    );
  }
  get database(): string {
    return this.configService.get<string>('DATABASE_NAME') ?? 'postgres_DB';
  }
  get ssl(): boolean {
    return this.configService.get<string>('DATABASE_SSL') === 'true';
  }
}
