import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { PasswordService } from 'src/auth/password.service';
import { Doctor } from 'src/entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  async createDoctor(createDoctorDto: CreateDoctorDto, createdById: string) {
    const passwordHash = await this.passwordService.hashPassword(
      createDoctorDto.user.password,
    );
    const userToCreate = { ...createDoctorDto.user, password: passwordHash };
    const user = await this.userService.createUser(userToCreate);

    const doctor = new Doctor();
    doctor.firstName = createDoctorDto.firstName;
    doctor.lastName = createDoctorDto.lastName;
    doctor.dateOfBirth = createDoctorDto.dateOfBirth;
    doctor.specializations = createDoctorDto.specializations;
    doctor.availableDaysTimes = createDoctorDto.availableDaysTimes;
    doctor.location = createDoctorDto.location;
    doctor.bio = createDoctorDto.bio;
    doctor.user = user;
    doctor.createdById = createdById;
    return await this.doctorRepository.save(doctor);
  }

  async getAllDoctors() {
    return await this.doctorRepository.find();
  }
}
