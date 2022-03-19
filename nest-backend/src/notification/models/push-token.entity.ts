import { User } from 'src/users/models/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ICreatedUpdated } from "../../common/models/utils/createdUpated/created-updated.interface";
import { ISoftDeleted } from "../../common/models/utils/softDeleted/soft-deleted.interface";

export enum PushDeviceType {
  iOS = 'iOS',
  Android = 'Android',
}

@Entity()
export class PushToken implements ICreatedUpdated, ISoftDeleted {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(
    () => User,
    user => user.id
  )
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
