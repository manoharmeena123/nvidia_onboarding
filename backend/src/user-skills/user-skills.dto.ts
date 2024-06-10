export class UserSkillsInputDto {
  skills: string[];
  workExperience: WorkExperienceInput[];
  education: EducationInput[];
  languages: LanguageInput[];
  socialAccounts: string[];
}

export class WorkExperienceInput {
  role: string;
  employerName: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
}

export class EducationInput {
  institution: string;
  concentration?: string;
  degree: string;
}

export class LanguageInput {
  language: string;
  fluency: string;
}
