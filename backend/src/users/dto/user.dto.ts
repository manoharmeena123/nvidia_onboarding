// src/users/dto/user.dto.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  // @Field()
  // firstName: string;

  // @Field()
  // lastName: string;

  @Field(() => ID)
  user_id: string;

  @Field()
  email: string;

  @Field()
  auth0_id: string;

  @Field()
  created_at: Date;


  @Field({ nullable: true })
  last_login?: Date;

  @Field({ nullable: true })
  last_completed_step?: string;
}
