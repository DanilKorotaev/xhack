import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import { Chat } from "./chat.entity";
import { User } from "../../users/models/user.entity";
import { Message } from './message.entity';

@Entity()
export class LastReadMessage implements ICreatedUpdated {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Message, user => user.id)
  message: Message;

  @ManyToOne(() => Chat, chat => chat.id)
  chat: Chat;

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;
}