import {CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ICreatedUpdated} from "../../common/models/utils/createdUpated/created-updated.interface";
import {Chat} from "../../chat/models/chat.entity";
import {User} from "../../users/models/user.entity";
import {Team} from "../../teams/models/team.entity";

@Entity()
export class TeamBookmarkEntity implements ICreatedUpdated {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, team => team.id)
  team: Team;
  
  @ManyToOne(() => User, user => user.id)
  user: User;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
