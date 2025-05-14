import { Injectable } from '@nestjs/common';
import { Candidate } from 'src/model/candidate.model';

@Injectable()
export class CandidateService {
  constructor() {}

  createCandidate(candidate: Candidate) {
    return candidate;
  }
}
