import Joi from "joi";

const userSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  email: Joi.string(),
  description: Joi.string(),
  specialization: Joi.string(),
  avatarUrl: Joi.string(),
});

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  isAvailableForSearching: boolean;
  specialization: string;
  description: string;
  networks: string[];
}

export class User {
  id: number | string;

  name: string;

  email: string;

  description: string;

  static validate = (object: any): boolean => true;
}
