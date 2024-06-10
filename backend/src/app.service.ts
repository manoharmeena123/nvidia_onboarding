import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  serverHello(): string {
    return " Hi! backend server is working fine.";
  }

}
