import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("")
  serverHello(): string {
    return this.appService.serverHello();
  }

  // // Secure route
  // @Get('profile')
  // @UseGuards(AuthGuard('auth0'))
  // getProfile(@Request() req) {
  //   return req.user; // This will return the user profile from Auth0
  // }
  @Get('login')
  @UseGuards(AuthGuard('auth0'))
  async login(@Req() req) {
    // Auth0 will handle redirection to the login page
    console.log('AuthController: login endpoint hit');
  }
}
