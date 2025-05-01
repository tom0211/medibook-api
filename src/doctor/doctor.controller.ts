import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/auth/request.interface';

@Controller('doctor')
@UseGuards(JwtAuthGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('create')
  async createDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
    @Request() req: AuthRequest,
  ) {
    const currentUserId = req.user.userId;
    return await this.doctorService.createDoctor(
      createDoctorDto,
      currentUserId,
    );
  }

  @Get('all')
  async getAllDoctors() {
    return await this.doctorService.getAllDoctors();
  }
}
