import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  seniority: 'junior' | 'senior';

  @Column({
    name: 'years_of_experience',
  })
  yearsOfExperience: number;

  @Column()
  availability: boolean;
}
