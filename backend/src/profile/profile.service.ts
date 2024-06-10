// src/profile/profile.service.ts

import {
  Injectable,
  Inject,
} from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/constant';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(@Inject(KNEX_CONNECTION) private knex: Knex) {}

  async createProfile(trx: Knex.Transaction, userId: string): Promise<void> {
    const newProfile = {
      profile_id: uuidv4(),
      user_id: userId,
    };
    console.log('New Profile is created', userId);
    await trx.table('profiles').insert(newProfile);
  }

  async setOtp(userId: string, otp: string): Promise<void> {
    const otpTimestamp = new Date(); // Current time as the timestamp

    await this.knex('profiles')
      .where({ user_id: userId }) // Assuming 'user_id' is the foreign key to the user in the 'profile' table
      .update({
        otp: otp,
        otp_timestamp: otpTimestamp,
      });
  }

  findByUserId(userId: string) {
    this.knex('profiles').where({ user_id: userId }).first();
  }

  async getOtp(
    userId: string,
  ): Promise<{ otp: string; otpTimestamp: Date } | null> {
    const profile = await this.knex('profiles')
      .select('otp', 'otp_timestamp')
      .where({ user_id: userId })
      .first();

    if (profile) {
      return { otp: profile.otp, otpTimestamp: profile.otp_timestamp };
    } else {
      return null; // No profile found, or no OTP set
    }
  }

  async getPhone(user_id: any): Promise<string | null | any> {
    try {
      const number = await this.knex('profiles')
        .where({ user_id: user_id })
        .select('phone_number');
      return number;
    } catch (error) {
      console.log('Error', error);
      return null;
    }
  }

  async validateOtp(userId: string, inputOtp: string): Promise<boolean> {
    const profileOtp = await this.getOtp(userId);

    if (!profileOtp) {
      return false; // No OTP was set or profile does not exist
    }

    const currentTime = new Date();
    const timeElapsed =
      (currentTime.getTime() - new Date(profileOtp.otpTimestamp).getTime()) /
      1000; // Time in seconds

    if (timeElapsed > 30 || profileOtp.otp !== inputOtp) {
      return false; // OTP has expired or does not match
    }

    return true;
  }

  async updateProfileData(
    res,
    userId: string,
    profileData: any,
  ): Promise<void> {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address_line1,
      address_line2,
      city,
      state,
      zip_code,
      lived_in_country,
      worked_in_country,
      date_of_birth,
    } = profileData;

    try {
      const profile = await this.knex('profiles')
        .where({ user_id: userId })
        .update({
          first_name,
          last_name,
          email,
          phone_number,
          address_line1,
          address_line2,
          city,
          state,
          zip_code,
          lived_in_country,
          worked_in_country,
          date_of_birth, // Ensure date is properly formatted
        });

      res.status(200).json({
        status: 'success',
        error: {},
        data: {
          profile: profile,
          message: 'User profile updated successfully',
        },
      });
    } catch (error) {
      console.error(
        'Error updating the profile',
        error.response?.data || error.message,
      );
      res.status(error?.status || 500).json({
        status: 'error',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message: error?.message || 'No error message',
        },
        data: {},
      });
    }
  }
}
