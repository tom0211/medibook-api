import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This should be done to add the User entity to the TypeORM context
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
