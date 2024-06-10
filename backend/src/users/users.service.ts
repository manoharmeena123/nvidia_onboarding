// src/users/users.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Knex } from 'knex';
import { UserDto } from './dto/user.dto';
import { KNEX_CONNECTION } from '../database/constant';
import { ProfileService } from '../profile/profile.service';
import { UserSkillsService } from 'src/user-skills/user-skills.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(KNEX_CONNECTION) private knex: Knex,
    private profileService: ProfileService,
    private userSkillService: UserSkillsService,
  ) {}

  async findAllUsers(): Promise<UserDto[]> {
    return this.knex.select('*').from('users');
  }

  async testConnection(): Promise<void> {
    try {
      const result = await this.knex.raw('SELECT 1+1 as result');
    } catch (error) {
      console.error('Connection Test Failed:', error);
    }
  }

  async findUserByEmail(email: string): Promise<UserDto | null> {
    console.log('UsersService: Finding user by email:', email);
    try {
      const user = await this.knex('users').where({ email }).first();
      if (user) {
        console.log('UsersService: User found:', user);
      } else {
        console.log('UsersService: User not found');
      }
      return user ? user : null;
    } catch (error) {
      console.error('Fetching users failed:', error);
    }
  }

  async createUser(email: string, auth0_id: string): Promise<UserDto> {
    const userId = uuidv4();
    const newUser: UserDto = {
      user_id: userId,
      email: email,
      auth0_id: auth0_id,
      created_at: new Date(),
    };
    try {
      await this.knex.transaction(async (trx) => {
        await trx.table('users').insert(newUser);

        await this.profileService.createProfile(trx, userId); // Assume createProfile accepts a transaction and a user ID
        await this.userSkillService.createUserSkills(trx, userId); // Creating userSkills for new user
      });
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
    }
    return newUser;
  }

  async updateMobileVerified(
    userId: string,
    mobileVerified: boolean,
  ): Promise<void> {
    try {
      await this.knex('users')
        .where({ user_id: userId })
        .update({ mobile_verified: mobileVerified });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePersonaVerified(
    personaVerified: any,
    userId: string,
  ): Promise<void> {
    try {
      await this.knex('users')
        .where({ user_id: userId })
        .update({ persona_verified: true });

      await this.updateVerificationOfPersona(personaVerified, userId)
      console.log('Persona verififed');
      await this.updateLastStep(2, userId);
    } catch (error) {
      console.log(error);
    }
  }

  async updateVerificationOfPersona(personaVerified: any, userId: string):Promise<void> {
    try {
      // Check if a row for the user already exists in the user_verifications table
      const existingRecord = await this.knex('user_verifications')
        .where({ user_id: userId })
        .first();

      if (existingRecord) {
        // If the record exists, update it
        await this.knex('user_verifications')
          .where({ user_id: userId })
          .update({ persona_response: personaVerified });
      } else {
        // If the record does not exist, insert a new row
        await this.knex('user_verifications').insert({
          user_id: userId,
          persona_response: personaVerified,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateLastStep(
    last_completed_step: number,
    userId: string,
  ): Promise<UserDto> {
    try {
      const user = await this.knex('users').where({ user_id: userId }).first();
      if (!user) throw new Error('User not found');
      console.log('updating last completed setup to ', last_completed_step);
      if (
        user.last_completed_step === 0 ||
        user.last_completed_step < last_completed_step
      ) {
        await this.knex('users').where({ user_id: userId }).update({
          last_completed_step: last_completed_step,
        });
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateLastLogin(user_id: string): Promise<void> {
    try {
      await this.knex('users')
        .where({ user_id })
        .update({ last_login: new Date() });
    } catch (error) {
      console.error('Error in updating last login', error);
    }
  }
}
