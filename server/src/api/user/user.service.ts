import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import {
   FilterQuery,
   Model,
   QueryOptions,
   UpdateQuery,
} from 'mongoose';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
   ) { }

   async createUser<T>(data: T) {
      const user = await this._userModel.create(data);

      return user;
   }

   async findOrCreateUser<T>(filter: FilterQuery<UserDocument>, data: T) {
      let user = await this._userModel.findOne(filter).select('+password');

      if (!user) {
         user = await this._userModel.create(data);
      }

      return user;
   }

   async getUser(filter: FilterQuery<UserDocument>) {
      const user = await this._userModel.findOne(filter).select('+password');

      return user;
   }

   async getUsers(filter: FilterQuery<UserDocument>) {
      const users = await this._userModel.find(filter);

      return users;
   }

   async updateUser(
      filter: FilterQuery<UserDocument>,
      update: UpdateQuery<UserDocument>,
      options?: QueryOptions<UserDocument>,
   ) {
      const user = await this._userModel.findOneAndUpdate(filter, update, {
         new: true,
         runValidators: true,
         ...options,
      });

      return user;
   }

   async deleteUser(
      filter: FilterQuery<UserDocument>,
      options?: QueryOptions<UserDocument>,
   ) {
      const user = await this._userModel.findOneAndDelete(filter, options);

      return user;
   }
}
