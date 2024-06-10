// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { ProfileModule } from '../profile/profile.module'; // Import ProfileModule
import { UserSkillsModule } from 'src/user-skills/user-skills.module';
import { UsersController } from './users.controller';



@Module({
  imports: [DatabaseModule, ProfileModule, UserSkillsModule], // Import ProfileModule here
  providers: [UsersService],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}
