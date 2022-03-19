import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {ICreatedUpdated} from "./created-updated.interface";

export class CreatedUpdatedHelperClass implements ICreatedUpdated {
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
