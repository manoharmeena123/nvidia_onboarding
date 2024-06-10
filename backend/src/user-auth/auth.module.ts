// src/auth/auth.module.ts

import { Module} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Auth0Strategy } from 'src/services/auth0/auth0.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { UsersService } from 'src/users/users.service';
import { ProfileModule } from 'src/profile/profile.module';
import { UserSkillsModule } from 'src/user-skills/user-skills.module';
import { TwilioModule } from 'src/services/twilio/twilio.module';
import { TwilioService } from 'src/services/twilio/twilio.service';

@Module({
    imports: [
        HttpModule, // Add HttpModule here
        PassportModule,
        TwilioModule,
        UsersModule,
        ProfileModule,
        UserSkillsModule
    ],
    providers: [Auth0Strategy, TwilioService, AuthService, UsersService],
    exports: [PassportModule, Auth0Strategy, TwilioService, AuthService, UsersService]
})
export class AuthModule {}

