export interface CandidateDto {
  name: string;
  surname: string;
  seniority: 'junior' | 'senior';
  yearsOfExperience: number;
  availability: boolean;
}
