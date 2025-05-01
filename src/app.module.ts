import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './database-config/database-config.module';
import { SeedSuperadminService } from './seed/SeedSuperadmin.service';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    // Added config module to manage environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConfigModule,
    AuthModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedSuperadminService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedSuperadminService: SeedSuperadminService) {}

  async onApplicationBootstrap() {
    await this.seedSuperadminService.seed();
  }
}
