import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {ISoftDeleted} from "../../common/models/utils/softDeleted/soft-deleted.interface";

@Entity()
export class News implements ICreatedUpdated, ISoftDeleted {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
