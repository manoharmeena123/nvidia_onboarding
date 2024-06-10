// src/profile/entities/profile.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ default: false })
    completed: boolean;

    @Column({ length: 255, nullable: true })
    first_name: string;
  
    @Column({ length: 255, nullable: true })
    last_name: string;
  
    @Column({ length: 255, nullable: true })
    email: string;
  
    @Column({ length: 50, nullable: true })
    phone_number: string;
  
    @Column({ length: 255, nullable: true })
    address_line1: string;
  
    @Column({ length: 255, nullable: true })
    address_line2: string;
  
    @Column({ length: 100, nullable: true })
    city: string;
  
    @Column({ length: 100, nullable: true })
    state: string;
  
    @Column({ length: 20, nullable: true })
    zip_code: string;
  
    @Column({ length: 100, nullable: true })
    lived_in_country: string;
  
    @Column({ length: 100, nullable: true })
    worked_in_country: string;
  
    @Column({ type: 'date', nullable: true })
    date_of_birth: string;
}
