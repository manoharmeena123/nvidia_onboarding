// src/users/entities/user-skills.entity.ts

import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class WorkExperience {
  @Field()
  role: string;

  @Field()
  employerName: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  currentlyWorking: boolean;
}

@ObjectType()
export class Education {
  @Field()
  institution: string;

  @Field({ nullable: true })
  concentration?: string;

  @Field()
  degree: string;
}

@ObjectType()
export class Language {
  @Field()
  language: string;

  @Field()
  fluency: string;
}

@ObjectType()
export class UserSkills {
  @Field(() => ID)
  user_id: string;

  @Field(() => [String])
  skills: string[];

  @Field(() => [WorkExperience])
  workExperience: WorkExperience[];

  @Field(() => [Education])
  education: Education[];

  @Field(() => [Language])
  languages: Language[];

  @Field(() => [String])
  socialAccounts: string[];
}

@InputType()
export class WorkExperienceInput extends WorkExperience {}

@InputType()
export class EducationInput extends Education {}

@InputType()
export class LanguageInput extends Language {}

@InputType()
export class UserSkillsInput {
  @Field(() => [String])
  skills: string[];

  @Field(() => [WorkExperienceInput])
  workExperience: WorkExperienceInput[];

  @Field(() => [EducationInput])
  education: EducationInput[];

  @Field(() => [LanguageInput])
  languages: LanguageInput[];

  @Field(() => [String])
  socialAccounts: string[];
}
