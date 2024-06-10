import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  async callback(@Req() req, @Res() res: Response) {
    // Handle the login process in the service
    console.log('user login response ', res);
    
    await this.authService.handleLogin(req, res);
  }

  @Get('profile')
  async getProfile(@Req() req, @Res() res: Response) {
    await this.authService.handleGetProfile(req, res);
  }
}
