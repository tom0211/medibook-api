import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // hashed password

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // One-to-one relation to Doctor (only if role is DOCTOR)
  @OneToOne(() => Doctor, (doctor) => doctor.user, { cascade: true })
  doctorProfile?: Doctor;

  // One-to-one relation to Patient (only if role is PATIENT)
  @OneToOne(() => Patient, (patient) => patient.user, { cascade: true })
  patientProfile?: Patient;
}
