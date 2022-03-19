import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';
import { User } from '../../users/models/user.entity';
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {Team} from "./team.entity";

export enum RequestType {
  UserToTeam = 'UserToTeam',
  TeamToUser = 'TeamToUser',
}

@Entity()
@Unique(["user", "team"])
export class TeamRequest implements ICreatedUpdated {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    name: "userId",
  })
  @ManyToOne(() => User, user => user.requests)
  user!: User;

  @Column({
    type: "int",
    name: "teamId",
  })
  @ManyToOne(() => Team, team => team.requests)
  team!: Team;

  @Column({
    type: "enum",
    enum: RequestType,
    nullable: false,
  })
  type!: RequestType;

  @Column({
    default: false
  })
  isCanceled: boolean

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;
}
