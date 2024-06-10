// user-skills.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserSkillsService } from './user-skills.service';
import { UsersService } from 'src/users/users.service';

@Controller('skills')
export class UserSkillsController {
  constructor(
    private userSkillsService: UserSkillsService,
    private userService: UsersService,
  ) {}

  @Get('get-skills')
  async getSkills(@Response() res: any) {
    let skills: any;
    try {
      skills = await this.userSkillsService.getSkills();
      res.status(200).json({
        status: 'success',
        error: {},
        data: {
          skill: skills,
        },
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'error',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message: error?.message || 'No Message',
        },
        data: {},
      });
    }
  }

  @Get('user')
  async getUserSkills(@Request() req: any, @Response() res: any) {
    let skills;
    try {
      skills = await this.userSkillsService.getUserSkillById(req.user.user_id);
      res.status(200).json({
        status: 'success',
        error: {},
        data: {
          skill: skills,
        },
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'error',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message: error?.message || 'No Message',
        },
        data: {},
      });
    }
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async updateUserSkills(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
    @Response() res: any,
  ) {
    let userSkillInput = req.body.userSkillsInput;
    // Upload the file and get the URL
    let cvLink = '';
    if (file) {
      try {
        cvLink = await this.userSkillsService.uploadFile(file);
      } catch (error) {
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
    try {
      // Update user skills with the CV link
      const skills = await this.userSkillsService.updateUserSkills(
        req.user.user_id,
        userSkillInput,
        cvLink,
      );
      const user = await this.userService.updateLastStep(3, req.user.user_id);
      res.json({
        status: 'success',
        error: {},
        data: {
          user: user,
          currentStep: user.last_completed_step,
          skillsSection: skills,
        },
      });
    } catch (error) {
      console.log('Error', error);
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
