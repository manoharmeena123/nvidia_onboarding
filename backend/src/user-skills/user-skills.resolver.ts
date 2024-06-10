import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSkillsService } from './user-skills.service';
import { UserSkills } from './user-skills.entity';

@Resolver()
export class UserSkillsResolver {
  constructor(private userSkillsService: UserSkillsService) {}

  @Mutation(returns => UserSkills)
  async updateUserSkills(@Args('userId') userId: string, @Args('input') input: UserSkills, @Args('cvLink') cv_link: string,) {
    return this.userSkillsService.updateUserSkills(userId, input, cv_link);
  }
}
