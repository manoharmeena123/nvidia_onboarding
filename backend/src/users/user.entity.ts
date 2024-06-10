// src/users/user.entity.ts

export class User {
  userId: string;
  email?: string;
  auth0_id?: string;
  created_at?: Date;
  last_login?: Date;
  last_completed_step?:number;
}
  