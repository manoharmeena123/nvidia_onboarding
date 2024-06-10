// src/auth/persona.service.ts

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';  // To convert Observable to Promise

@Injectable()
export class PersonaService {
    constructor(
        private httpService: HttpService, 
        private configService: ConfigService
    ) {}

    async initiateVerification(userId: string): Promise<any> {
        const response = await firstValueFrom(this.httpService.post(
            'https://api.withpersona.com/v1/inquiries/create',
            {
                data: {
                    attributes: {
                        type: 'inquiry',
                        'template-id': this.configService.get<string>('PERSONA_TEMPLATE_ID'),
                        'reference-id': userId,
                        environment: 'sandbox' // Change to 'production' as needed
                    }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${this.configService.get<string>('PERSONA_API_KEY')}`
                }
            }
        ));
        return response.data;
    }
}
