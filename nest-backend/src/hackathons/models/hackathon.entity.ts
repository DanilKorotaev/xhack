import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ICreatedUpdated } from '../../common/models/utils/createdUpated/created-updated.interface';
import { ISoftDeleted } from '../../common/models/utils/softDeleted/soft-deleted.interface';
import 'reflect-metadata';
import { Team } from 'src/teams/models/team.entity';
import { PossibleHackParticipant } from './possibleHackParticipant.entity';
import { Tag } from 'src/tags/models/tag.entity';

@Entity()
export class Hackathon implements ICreatedUpdated, ISoftDeleted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default: true,
  })
  isOnline: boolean;

  @Column()
  location: string;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Column()
  siteUrl: string;

  @Column()
  avatarUrl: string;

  @OneToMany(
    () => Team,
    team => team.hackathon,
  )
  teams: Team[];

  @ManyToMany(
    () => Tag,
    tag => tag.id,
  )
  @JoinTable({
    name: 'hackathon_to_tag',
  })
  tags: Tag[];

  @OneToMany(
    () => PossibleHackParticipant,
    possibleParticipants => possibleParticipants.hackathon,
  )
  @JoinColumn()
  possibleParticipants: PossibleHackParticipant[];

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ select: false})
  deletedAt!: Date;
}
