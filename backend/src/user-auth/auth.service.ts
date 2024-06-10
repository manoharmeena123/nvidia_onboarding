import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Knex } from 'knex'; // Make sure Knex is imported
import { KNEX_CONNECTION } from '../database/constant';
import NodeCache = require('node-cache');

// const userInfoCache = new NodeCache({ stdTTL: 36000 }); // user info in cache for an hour

@Injectable()
export class AuthService {
  private cache: NodeCache;
  constructor(
    @Inject(KNEX_CONNECTION) private knex: Knex,
    private usersService: UsersService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.cache = new NodeCache({ stdTTL: 10 * 3600 });
  }

  async validateUser(auth0Id: string, email: string): Promise<any> {
    console.log(
      'AuthService: Validating user with email:',
      email,
      'and auth0Id:',
      auth0Id,
    );
    let user = await this.usersService.findUserByEmail(email);
    console.log(user);
    if (!user) {
      console.log('AuthService: User not found, creating new user');
      user = await this.usersService.createUser(email, auth0Id);
    } else {
      console.log('AuthService: User found:', user);
    }
    await this.usersService.updateLastLogin(user.user_id);
    console.log('AuthService: User validated and last login updated:', user);
    return user;
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const domain = this.configService.get('AUTH0_DOMAIN');
    const url = `https://${domain}/userinfo`;

    const cachedUserInfo = this.cache.get(accessToken);
    console.log('cache user ',cachedUserInfo);
    if (cachedUserInfo) {
      console.log('retruning data from cache');
      return cachedUserInfo;
    }
    console.log('Fetching user info from URL:', url);

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      this.cache.set(accessToken, response.data);
      console.log('Cache set');
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching user info:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        'Failed to fetch user info',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async handleLogin(req, res) {
    try {
      const { emails, user_id } = req.user;
      const email = emails[0].value;
      await this.validateUser(user_id, email);

      const accessToken = req.user.accessToken;
      console.log('AuthService: User logged in and session updated:', this.configService.get<string>('FRONTEND_URL'));
      res.cookie('token', accessToken, {
        httpOnly: true,
        SameSite: 'none', // Necessary for cross-site cookies
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      });
      res.redirect(`${this.configService.get<string>('FRONTEND_URL')}/verify-form`);
    } catch (error) {
      res.redirect(`${this.configService.get<string>('FRONTEND_URL')}/login`);
    }
  }

  async handleGetProfile(req, res): Promise<any> {
    try {
      if (!req.user) {
        res.json({ message: 'No user logged in.' });
        return;
      }
      // Assuming the user's ID is stored in req.user.userId
      const profile = await this.knex('profiles')
        .where({ user_id: req.user.user_id })
        .first(); // Fetch the profile associated with the user

      const skills = await this.knex('user_skills')
        .where({ user_id: req.user.user_id })
        .first(); // Fetch the profile associated with the user

      console.log(req.user);
      console.log('response send back');
      res.status(200).json({
        status: 'success',
        error: {},
        data: {
          user: req.user,
          currentStep: req.user.last_completed_step,
          verifyForm: profile || {},
          skillsSection: skills || {},
        },
      });
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
}
