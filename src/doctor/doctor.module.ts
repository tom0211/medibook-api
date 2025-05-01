import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { UserModule } from 'src/user/user.module';
import { PasswordService } from 'src/auth/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), UserModule],
  providers: [DoctorService, PasswordService],
  controllers: [DoctorController],
})
export class DoctorModule {}
