import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { DatabaseModule } from '../database/database.module'; // Ensure this module provides KNEX_CONNECTION
import { ProfileController } from './profile.controller';
import { UsersService } from 'src/users/users.service';
import { UserSkillsModule } from 'src/user-skills/user-skills.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserSkillsModule)],
  providers: [ProfileService, UsersService],
  controllers:[ProfileController],
  exports: [ProfileService], // Export ProfileService so it can be used in other modules
})
export class ProfileModule {}
