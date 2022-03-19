import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {ChatBookmarkEntity} from "../../bookmarks/models/chat-bookmark.entity";
import { Team } from "../../teams/models/team.entity";
import { Message } from "./message.entity";
import { User } from "../../users/models/user.entity";

export enum ChatTypeEnum {
  P2P = 'P2P',
  GROUP = 'GROUP',
}

@Entity()
export class Chat implements ICreatedUpdated {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ChatTypeEnum,
    nullable: false,
  })
  type: ChatTypeEnum;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  @JoinColumn()
  @ManyToOne(() => User)
  firstUser?: User;

  @JoinColumn()
  @ManyToOne(() => User)
  secondUser?: User;

  @JoinColumn()
  @OneToOne(() => Team)
  team?: Team;

  @CreateDateColumn({type: "timestamp", select: false})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamp", select: false})
  updatedAt!: Date;
}
