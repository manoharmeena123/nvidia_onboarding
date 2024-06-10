// src/api/userSkillsApi.ts
import apiClient from "./apiClient";
interface Skill {
  [key: string]: string;
}
interface SkillsResponse {
  status: string;
  error: Record<string, unknown>;
  data: {
    skills: Skill[];
  };
}
export const getUserSkills = async (): Promise<SkillsResponse> => {
  try {
    const response = await apiClient.get<SkillsResponse>("/users/skills");
    return response;
  } catch (error: any) {
    console.error("Failed to fetch user skills:", error);
    throw error;
  }
};