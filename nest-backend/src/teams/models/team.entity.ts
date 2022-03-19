import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/models/user.entity';
import { ICreatedUpdated } from '../../common/models/utils/createdUpated/created-updated.interface';
import { ISoftDeleted } from '../../common/models/utils/softDeleted/soft-deleted.interface';
import { TeamRequest } from './team-request.entity';
import { MessageBookmarkEntity } from '../../bookmarks/models/message-bookmark.entity';
import { TeamBookmarkEntity } from '../../bookmarks/models/team-bookmark.entity';
import { Hackathon } from 'src/hackathons/models/hackathon.entity';
import { Chat } from "../../chat/models/chat.entity";

@Entity()
export class Team implements ICreatedUpdated, ISoftDeleted {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: 20,
  })
  maxCountUser: number;

  @ManyToOne(
    () => Hackathon,
    hack => hack.id
  )
  hackathon: Hackathon;

  @Column({
    nullable: true,
  })
  avatarUrl?: string;

  @Column({
    type: 'int',
    name: 'captainId',
  })
  @ManyToOne(
    () => User,
    user => user.teams,
  )
  captain!: User;

  @Column({ nullable: true, type: "int" })
  @OneToOne(() => Chat)
  @JoinColumn()
  chat: Chat | null;

  @ManyToMany(
    () => User,
    user => user.teams,
  )
  @JoinTable({
    name: 'team_user',
  })
  members: User[];

  @OneToMany(
    () => TeamRequest,
    teamRequest => teamRequest.team,
  )
  @JoinColumn()
  requests: TeamRequest[];

  @Column({
    default: true
  })
  isInActiveSearch: boolean;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt!: Date;
}
