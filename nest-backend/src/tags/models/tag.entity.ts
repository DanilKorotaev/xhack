import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ICreatedUpdated } from '../../common/models/utils/createdUpated/created-updated.interface';

@Entity()
@Unique(['name'])
export class Tag implements ICreatedUpdated {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
