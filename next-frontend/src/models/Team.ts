import Joi from "joi";
import { User } from "./User";

const teamSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  description: Joi.string(),
  captain: Joi.exist(),
  members: Joi.array().exist(),
});

export class Team {
  id: number;

  name: string;

  description: string;

  captain: User;

  members: User[];

  static validate = (team: Team): boolean =>
    // TODO
    // eslint-disable-next-line implicit-arrow-linebreak
    true;
}
