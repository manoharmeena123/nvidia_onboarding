import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Inject } from '@nestjs/common';
import { UserSkillsInputDto } from './user-skills.dto';
import { FileService } from 'src/services/file/file.service';

@Injectable()
export class UserSkillsService {
  constructor(
    @Inject('KnexConnection') private knex: Knex,
    private readonly fileService: FileService,
  ) {}

  async createUserSkills(trx: Knex.Transaction, userId: string): Promise<void> {
    await trx.table('user_skills').insert({ user_id: userId });
    console.log('Skill is added');
  }

  formatArrayForPostgres(array) {
    return `{${array.map((item) => `"${item}"`).join(',')}}`;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileUrl = await this.fileService.uploadFile(file);
    return fileUrl;
  }

  async getUserSkillById(userId:string):Promise<any>{
    return this.knex('user_skills')
      .where({ user_id: userId });
  }

  async getSkills(): Promise<any> {
    try {
      const result = await this.knex('skills').select('key', 'value');
      if (result && result.length > 0) {
        const formattedResult = result.reduce((acc, row) => {
          acc[row.key] = row.value;
          return acc;
        }, {});
        return formattedResult;
      }
      return null;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw new Error('Could not fetch skills');
    }
  }

  async updateUserSkills(
    userId: string,
    input: UserSkillsInputDto,
    cvLink: string,
  ): Promise<any> {
    console.log('Updating skills');
    console.log(input);
    return this.knex('user_skills')
      .where({ user_id: userId })
      .update({
        skills: input.skills,
        work_experience: JSON.stringify(input.workExperience),
        education: JSON.stringify(input.education),
        languages: JSON.stringify(input.languages),
        social_accounts: JSON.stringify(input.socialAccounts),
        cv_link: cvLink,
      });
  }
}
