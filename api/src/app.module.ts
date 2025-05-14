import { Module } from '@nestjs/common';
import { CandidatesModule } from './module/candidates/candidates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './model/entity/candidate.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? ''),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Candidate],
    }),
    CandidatesModule,
  ],
})
export class AppModule {}
