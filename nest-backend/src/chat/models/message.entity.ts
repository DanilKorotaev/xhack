import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import { Chat } from "./chat.entity";
import { ID } from "../../typings";
import { User } from "../../users/models/user.entity";

@Entity()
export class Message implements ICreatedUpdated {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id)
  from: User;

  @Column({
    type:"uuid"
  }) 
  @Generated("uuid")
  guid: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  text: string;

  @ManyToOne(() => Chat, chat => chat.id)
  chat: Chat;

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;
}
