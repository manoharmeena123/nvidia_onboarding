// src/user-skills/user-skills.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsResolver } from './user-skills.resolver';
import { UsersService } from 'src/users/users.service';
import { ProfileModule } from '../profile/profile.module';
import { UploadModule } from 'src/services/file/file.module'; 

@Module({
  imports: [forwardRef(() => ProfileModule), UploadModule], // Import ProfileModule if ProfileService is needed
  controllers: [UserSkillsController],
  providers: [UserSkillsService, UsersService, UserSkillsResolver],
  exports: [UserSkillsService]  // Export the service if it needs to be used externally
})
export class UserSkillsModule {}
