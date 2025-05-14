import { CandidateSeniority } from 'src/enum/candidate-seniority.enum';

export interface CandidateDto {
  name: string;
  surname: string;
  seniority: CandidateSeniority;
  yearsOfExperience: number;
  availability: boolean;
}
