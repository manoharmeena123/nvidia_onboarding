// app module

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './user-auth/auth.controller';
import { AuthService } from './user-auth/auth.service';
import { UsersModule } from './users/users.module'; // Ensure UsersModule is imported
import { Auth0Strategy } from './services/auth0/auth0.strategy'; // Import your Auth0 strategy
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TwilioModule } from './services/twilio/twilio.module';
import { AuthModule } from './user-auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { UserSkillsModule } from './user-skills/user-skills.module';
import { TwilioController } from './services/twilio/twilio.controller';
import { ProfileController } from './profile/profile.controller';
import { UserSkillsController } from './user-skills/user-skills.controller';
import { UsersController } from './users/users.controller';
import { UploadModule } from './services/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    DatabaseModule,
    ProfileModule,
    TwilioModule,
    UserSkillsModule,
    UsersModule,
    AuthModule, UploadModule,
    PassportModule.register({ defaultStrategy: 'auth0' }),
  ], // Register PassportModule
  controllers: [AuthController, AppController],
  providers: [AppService, AuthService, Auth0Strategy], // Include Auth0Strategy in providers
  exports: [AuthService], // Export AuthService if needed in other modules
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(AuthController,TwilioController,ProfileController,UserSkillsController, UsersController)
  }
}
