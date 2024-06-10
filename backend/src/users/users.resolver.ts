// src/users/users.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserDto])
  async users(): Promise<UserDto[]> {
    return this.usersService.findAllUsers();
  }

  @Mutation(() => UserDto)
  async createUser(@Args('email') email: string, @Args('auth0Id') auth0Id: string): Promise<UserDto> {
    return this.usersService.createUser(email, auth0Id);
  }
  @Mutation(() => UserDto)
  async updateProfile(@Args('lastCompletedStep') last_completed_step: number, @Args('userId') user_id: string): Promise<UserDto> {
    return this.usersService.updateLastStep(last_completed_step, user_id);
  }
}
