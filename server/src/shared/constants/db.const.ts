import { Schema } from 'mongoose';

export class DbMixins {
  createdAt: Date;
  updatedAt: Date;
}

export type Relations<T = any> = Schema.Types.ObjectId | string | T;
export type Nullable<T> = null | T;

export const schemaOptions = {
  timestamps: true,
  virtuals: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};
