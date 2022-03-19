export type StringOrNumberType = string | number;
export type ID = StringOrNumberType;

export interface IUserPayload {
  id: string | number;
  email: string;
  admin?: boolean;
}
