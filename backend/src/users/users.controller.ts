import { Controller, Post, Body, Request, Get, Response } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    
  ) {}

  @Post('persona-verified')
  async updatePersonaVerified(
    @Body() body: any,
    @Request() req: any,
    @Response() res: any
  ): Promise<any> {
    try {
      await this.usersService.updatePersonaVerified(body.personaVerified, req.user.user_id);
      res.json({
        status: 'success',
        error: {},
        data: {
          message: 'Persona Verified'
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
