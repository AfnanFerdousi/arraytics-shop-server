/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type IUser = {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    created_by: string;
};

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<Pick<IUser, "name" | "password" | "email" | "id"> | null>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & mongoose.Model<IUser>;