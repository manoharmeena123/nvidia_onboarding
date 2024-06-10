// src/profile/profile.controller.ts

import { Controller, Post, Body, Req, Res, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UsersService } from 'src/users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService, private userService:UsersService) {}

  @Post('update')
  async updateProfile(@Req() req, @Res() res, @Body() body) {
    try{
      if (Object.keys(body.stepData).length !== 0){
        await this.profileService.updateProfileData(
          res,
          req.user.user_id,
          body.stepData,
        );
        await this.userService.updateLastStep(1,req.user.user_id);
  
        res.status(200).json({
          status: "success",
          error: {},
          data: {
            current_step: 1,
          }
        });
        
      }

    }catch(error){
      res.status(error.status || 500).json({
        status: 'error',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message: error.message,
        },
        data: {},
      });
    }
  }
}
