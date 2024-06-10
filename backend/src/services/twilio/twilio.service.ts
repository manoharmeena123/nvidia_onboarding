import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Twilio from 'twilio';


dotenv.config();

@Injectable()
export class TwilioService {
    private twilioClient;

    constructor() {
      const httpClient = new Twilio.RequestClient({
        timeout: 10000, // Timeout in milliseconds (10 seconds)
      });
  
      this.twilioClient = new Twilio.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
        httpClient,
      });
    }

    async sendVerification(to: string, channel: 'sms' | 'email'): Promise<string> {
        const verification = await this.twilioClient.verify.services(process.env?.TWILIO_VERIFY_SERVICE_ID)
          .verifications
          .create({ to, channel });
    
        return verification.sid;
    }

    async checkVerification(to: string, code: string): Promise<boolean> {
        const verificationCheck = await this.twilioClient.verify.services(process.env?.TWILIO_VERIFY_SERVICE_ID)
          .verificationChecks
          .create({ to, code });
    
        return verificationCheck.status === 'approved';
      }
}