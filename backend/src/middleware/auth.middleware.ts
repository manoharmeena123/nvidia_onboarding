// src/auth/auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from 'src/user-auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Inject UsersService
  ) {}

  async use(req, res: Response, next: NextFunction) {
    try {
      if (
        (req.path === '/login' || req.path == '/auth/callback') &&
        req.method === 'GET'
      ) {
        console.log('Skipping AuthMiddleware for /login endpoint');
        return next(); // Skip middleware processing and continue
      }
      console.log('req.cookies', req.cookies);
      const accessToken =
        req.cookies['token'];
      console.log('control was here');
      if (!accessToken) {
        return res.status(401).json({ message: 'No access token provided' });
      }
      const data = await this.authService.getUserInfo(accessToken);
      const { email } = data;
      let user = await this.usersService.findUserByEmail(email);
      if (user) {
        data.first_name = data.given_name;
        data.last_name = data.family_name;
        req.user = { ...data, ...user };
        next();
      } else {
        res.redirect(`${process.env.FRONTEND_URL}/verify-form`);
      }
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
