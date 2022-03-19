import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';
import { User } from '../../users/models/user.entity';
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";

import { Hackathon } from './hackathon.entity';


@Entity()
@Unique(["user", "hackathon"])
export class PossibleHackParticipant implements ICreatedUpdated {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    name: "userId",
  })
  @ManyToOne(() => User, user => user.possibleHackathons)
  user!: User;

  @Column({
    type: "int",
    name: "hackathonId",
  })
  @ManyToOne(() => Hackathon, hackathon => hackathon.possibleParticipants)
  hackathon!: Hackathon;

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;
}
