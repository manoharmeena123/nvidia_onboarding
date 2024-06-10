// src/profile/dto/create-profile.dto.ts

export class CreateProfileDto {
    userId: number;  // Assuming a foreign key to the User entity
    step1_data?: any;  // Optional initial step data
}
