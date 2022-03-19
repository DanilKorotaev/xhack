import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ICreatedUpdated } from '../../common/models/utils/createdUpated/created-updated.interface';
import { ISoftDeleted } from '../../common/models/utils/softDeleted/soft-deleted.interface';
import { Team } from '../../teams/models/team.entity';
import { TeamRequest } from '../../teams/models/team-request.entity';
import { PossibleHackParticipant } from 'src/hackathons/models/possibleHackParticipant.entity';
import { Tag } from '../../tags/models/tag.entity';
import { Message } from "../../chat/models/message.entity";

@Entity()
export class User implements ICreatedUpdated, ISoftDeleted {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  avatarUrl?: string;

  @Column({
    type: 'jsonb',
    default: [],
  })
  networks: string[];

  @Column({
    default: true,
  })
  isAvailableForSearching!: boolean;

  @Column({
    default: '',
  })
  specialization!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    default: '',
  })
  description: string;

  @Column({ select: false})
  @Exclude()
  hashedPassword!: string;

  @ManyToMany(
    () => Team,
    team => team.members,
  )
  @JoinTable({
    name: 'team_user',
  })
  teams: Team[];

  @OneToMany(
    () => TeamRequest,
    teamRequest => teamRequest.user,
  )
  requests: TeamRequest[];

  @ManyToMany(
    () => Tag,
    tag => tag.id,
  )
  @JoinTable({
    name: 'user_to_tag',
  })
  tags: Tag[];

  @OneToMany(
    () => PossibleHackParticipant,
    possibleHackathons => possibleHackathons.user,
  )
  possibleHackathons: PossibleHackParticipant[];


  /* META ----------------------------------------------------------------------------------------------------------- */
  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ select: false})
  deletedAt!: Date;
  /* END OF META ---------------------------------------------------------------------------------------------------- */
}
