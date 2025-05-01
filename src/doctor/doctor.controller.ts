import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('doctor')
@UseGuards(JwtAuthGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('create')
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.createDoctor(createDoctorDto);
  }

  @Get('all')
  async getAllDoctors() {
    return await this.doctorService.getAllDoctors();
  }
}
