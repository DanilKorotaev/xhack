import {CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {User} from "../../users/models/user.entity";

@Entity()
export class MessageBookmarkEntity implements ICreatedUpdated {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Message, message => message.bookmarks)
  // message: Message;
  //
  // @ManyToOne(() => User, user => user.bookmarks)
  // user: User;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
