import { Body, Controller, Post } from '@nestjs/common';
import { CandidateDto } from 'src/model/dto/candidate.dto';
import { Candidate } from 'src/model/entity/candidate.entity';
import { CandidateService } from 'src/service/candidate/candidate.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async postCandidate(@Body() candidate: CandidateDto): Promise<Candidate> {
    return await this.candidateService.createCandidate(candidate);
  }
}
