import { Injectable, Logger } from '@nestjs/common';
import { User, UserRole } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedSuperadminService {
  private readonly logger = new Logger(SeedSuperadminService.name);

  constructor(private dataSouce: DataSource) {}

  async seed() {
    const userRepository = this.dataSouce.getRepository(User);

    const existingSuperadmin = await userRepository.findOneBy({
      role: UserRole.SUPERADMIN,
    });
    if (existingSuperadmin) {
      this.logger.log(
        'Superadmin already exists. Skipping seed.',
        existingSuperadmin.email,
      );
      return;
    }
    const superadmin = userRepository.create({
      email: 'kalambe125@gmail.com',
      password: 'admin@123',
      role: UserRole.SUPERADMIN,
    });

    await userRepository.save(superadmin);
    this.logger.log('Superadmin seeded successfully:', superadmin.email);
  }
}
