// src/profile/dto/update-profile.dto.ts

import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProfileDto {

  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  phone_number?: string;

  @IsOptional()
  @IsString()
  address_line1?: string;

  @IsOptional()
  @IsString()
  address_line2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsNotEmpty()
  @IsString()
  lived_in_country?: string;

  @IsOptional()
  @IsString()
  worked_in_country?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_of_birth?: Date;
}
