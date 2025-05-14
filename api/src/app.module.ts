import { Module } from '@nestjs/common';
import { CandidatesController } from './controller/candidates/candidates.controller';
import { CandidateService } from './service/candidate/candidate.service';

@Module({
  imports: [],
  controllers: [CandidatesController],
  providers: [CandidateService],
})
export class AppModule {}
