import { Controller, Post } from '@nestjs/common';
import { Candidate } from 'src/model/candidate.model';
import { CandidateService } from 'src/service/candidate/candidate.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  postCandidate(candidate: Candidate) {
    this.candidateService.createCandidate(candidate);
  }
}
