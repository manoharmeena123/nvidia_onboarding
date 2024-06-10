// src/auth/auth0.strategy.ts
import { Strategy } from 'passport-auth0';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    
    super({
      domain: process.env?.AUTH0_DOMAIN,
      clientID: process.env?.AUTH0_CLIENT_ID,
      clientSecret: process.env?.AUTH0_CLIENT_SECRET,
      callbackURL: process.env?.AUTH0_CALLBACK_URL,
      scope: 'openid email profile',
    });
  }

  validate(accessToken, refreshToken, extraParams, profile, done): any {
    profile.accessToken = accessToken;
    return done(null, profile);
  }
}
