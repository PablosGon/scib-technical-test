import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const newCandidate = new Candidate();
    newCandidate.name = candidate.name;
    newCandidate.surname = candidate.surname;
    newCandidate.seniority = candidate.seniority;
    newCandidate.yearsOfExperience = candidate.yearsOfExperience;
    newCandidate.availability = candidate.availability;

    return await this.candidatesRepository.save(newCandidate);
  }
}
