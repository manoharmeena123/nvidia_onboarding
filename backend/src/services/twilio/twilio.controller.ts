// src/twilio/twilio.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Response,
} from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { UsersService } from 'src/users/users.service';

@Controller('twilio')
export class TwilioController {
  constructor(
    private readonly twilioService: TwilioService,
    private userService: UsersService,
  ) {}

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyTwilio(
    @Body() body: { phoneNumber: string },
    @Response() res: any,
  ): Promise<void> {
    console.log('Sending veification');
    try {
      await this.twilioService.sendVerification(
        this.formatPhoneNumber(body.phoneNumber),
        'sms',
      ),
        res.status(200).json({
          status: 'success',
          error: {},
          data: {
            otpSend: true,
          },
        });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'error',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message:
            'Twilio is unable to send OTP. Please contact Twilio support.',
        },
        data: {},
      });
    }
  }

  formatPhoneNumber(phoneNumber: string) {
    // Remove all non-digit characters from the phone number
    const digits = phoneNumber.replace(/\D/g, '');
    // Ensure the phone number includes the '+' and country code
    return '+' + digits;
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  async checkCode(
    @Body() body: { phoneNumber: string; code: string },
    @Request() req: any,
    @Response() res: any,
  ): Promise<void> {
    console.log('Code veification');
    try {
      const response = await this.twilioService.checkVerification(
        this.formatPhoneNumber(body?.phoneNumber),
        body?.code,
      );
      console.log(response);
      if (response) {
        this.userService.updateMobileVerified(req.user.user_id, true);
        res.status(200).json({
          status: 'success',
          error: {},
          data: {
            verification: true,
          },
        });
      } else {
        res.status(500).json({
          status: 'failed',
          error: {
            message: 'Invalid OTP',
          },
          data: {
            verification: false,
          },
        });
      }
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'failed',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message: error.message,
        },
        data: {
          verification: false,
        },
      });
    }
  }
}
