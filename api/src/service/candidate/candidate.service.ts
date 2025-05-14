import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateSeniority } from 'src/enum/candidate-seniority.enum';
import { CandidateDto } from 'src/model/dto/candidate.dto';
import { Candidate } from 'src/model/entity/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidatesRepository: Repository<Candidate>,
  ) {}

  async createCandidate(candidate: CandidateDto): Promise<Candidate> {
    if (!candidate) {
      throw new BadRequestException('candidate must not be null');
    }

    const candidateValidationErrors = this.validationErrors(candidate);
    if (candidateValidationErrors.length > 0) {
      throw new BadRequestException(
        `not a valid candidate: ${candidateValidationErrors.join(' - ')}`,
      );
    }

    let result: Candidate;

    try {
      const newCandidate = new Candidate();
      newCandidate.name = candidate.name;
      newCandidate.surname = candidate.surname;
      newCandidate.seniority = candidate.seniority;
      newCandidate.yearsOfExperience = candidate.yearsOfExperience;
      newCandidate.availability = candidate.availability;

      result = await this.candidatesRepository.save(newCandidate);
    } catch {
      throw new InternalServerErrorException(
        'There was an error while creating the candidate',
      );
    }

    return result;
  }

  //#region Private methods

  private validationErrors(candidate: CandidateDto): string[] {
    const errors: string[] = [];

    if (!candidate.name) {
      errors.push('name must not be empty');
    }

    if (!candidate.surname) {
      errors.push('surname must not be empty');
    }

    if (!Object.values(CandidateSeniority).includes(candidate.seniority)) {
      errors.push(
        `seniority must be ${Object.values(CandidateSeniority).join(' or ')}`,
      );
    }

    if (candidate.yearsOfExperience < 0) {
      errors.push('years of experience must be non-negative');
    }

    return errors;
  }

  //#endregion
}
