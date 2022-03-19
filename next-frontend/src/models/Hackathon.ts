import Joi from "joi";

const hackathonSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  description: Joi.string(),
});

export class Hackathon {
  id: number;

  name: string;

  description: string;

  static validate = (object: any): boolean => true;
}
