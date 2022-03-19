import {CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {User} from "../../users/models/user.entity";
import {Chat} from "../../chat/models/chat.entity";

@Entity()
export class ChatBookmarkEntity implements ICreatedUpdated {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Chat, chat => chat.bookmarks)
  // chat: Chat;
  //
  // @ManyToOne(() => User, user => user.chatBookmarks)
  // user: User;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
