// src/twilio/twilio.module.ts
import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { ProfileService } from 'src/profile/profile.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule],
    providers: [TwilioService, ProfileService],
    controllers: [TwilioController],
    exports: [TwilioService]  // Export TwilioService for use in other modules
})
export class TwilioModule {}
