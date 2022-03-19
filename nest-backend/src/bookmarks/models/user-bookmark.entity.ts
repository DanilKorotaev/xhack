import {CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {User} from "../../users/models/user.entity";

@Entity()
export class UserBookmarkEntity implements ICreatedUpdated {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  bookmarkedUser: User;
  
  @ManyToOne(() => User, user => user.id)
  owner: User;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
