/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type IUser = {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    created_by: string;
};

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<Pick<IUser, "name" | "password" | "email" | "id" | "created_by"> | null>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & mongoose.Model<IUser>;

export type IUserFilters = {
    name?: string;
    email?: string;
    searchText ?: string;
};