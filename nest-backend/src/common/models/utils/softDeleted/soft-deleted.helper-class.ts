import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm';
import {ISoftDeleted} from "./soft-deleted.interface";

export class SoftDeletedHelperClass implements ISoftDeleted {
  @DeleteDateColumn({type: "timestamp"})
  deletedAt: Date;
}
