import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

/**
 * Interface to model the User Schema for TypeScript.
 * @param email: string
 * @param firstName: string
 * @param lastName: string
 * @param username: string
 * @param role: string
 */

export interface IUser extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImgUrl?: string;
}

export enum ROLES {
  user = 'user',
  admin = 'admin'
}

export const roles = [ROLES.user, ROLES.admin];

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: roles,
      default: ROLES.user
    },
    profileImgUrl: { type: String }
  },
  {
    timestamps: true
  }
);
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Virtual Methods
userSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

export const User = mongoose.model<IUser>('User', userSchema);
