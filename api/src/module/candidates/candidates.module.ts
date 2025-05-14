import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesController } from 'src/controller/candidates/candidates.controller';
import { Candidate } from 'src/model/entity/candidate.entity';
import { CandidateService } from 'src/service/candidate/candidate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  controllers: [CandidatesController],
  providers: [CandidateService],
})
export class CandidatesModule {}
