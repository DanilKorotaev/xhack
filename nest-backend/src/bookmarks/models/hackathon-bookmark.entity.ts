import {CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {Chat} from "../../chat/models/chat.entity";
import {User} from "../../users/models/user.entity";
import {Hackathon} from "../../hackathons/models/hackathon.entity";

@Entity()
export class HackathonBookmarkEntity implements ICreatedUpdated {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hackathon, hackathon => hackathon.id)
  hackathon: Hackathon;
  
  @ManyToOne(() => User, user => user.id)
  user: User;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
