import { PushToken } from './../../notification/models/push-token.entity';
import { User } from '../../users/models/user.entity';
import { Team } from "../../teams/models/team.entity";
import { Hackathon } from "../../hackathons/models/hackathon.entity";
import { News } from "../../news/models/news.entity";
import { TeamRequest } from "../../teams/models/team-request.entity";
import { Message } from "../../chat/models/message.entity";
import { Chat } from "../../chat/models/chat.entity";
import { PossibleHackParticipant } from 'src/hackathons/models/possibleHackParticipant.entity';
import { Tag } from '../../tags/models/tag.entity';
import { UserBookmarkEntity } from 'src/bookmarks/models/user-bookmark.entity';
import { TeamBookmarkEntity } from 'src/bookmarks/models/team-bookmark.entity';
import { HackathonBookmarkEntity } from 'src/bookmarks/models/hackathon-bookmark.entity';
import { LastReadMessage } from 'src/chat/models/last-read-message.entity';

export interface IDatabaseConfig {
  type: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string,
  database: string,
  entities: any[],
  synchronize: boolean,

  dropSchema?: boolean,
  logging?: boolean,
}

// export const sqliteMemory = (): { databaseConfig: IDatabaseConfig } => ({
//   databaseConfig: {
//     type: "sqlite",
//     database: ":memory:",
//     dropSchema: true,
//     entities: [User, Team, Hackathon, Request, Message, Chat, News],
//     synchronize: true,
//     logging: false,
//   }
// });

export default (): { databaseConfig: IDatabaseConfig; } => ({
  databaseConfig: {
    type: 'postgres',
    host: process.env.PG_DB_HOST,
    port: +process.env.PG_DB_PORT,
    username: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_NAME,
    entities: [User, Team, Hackathon, TeamRequest, Message, Chat,
      News, PossibleHackParticipant, Tag, UserBookmarkEntity,
      TeamBookmarkEntity, HackathonBookmarkEntity, LastReadMessage,
      PushToken
    ],
    synchronize: true,
    logging: true,
  }
});

