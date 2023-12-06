/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type IItem = {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    created_by: string;
};

export type ItemModel = {
    isItemExist(
        id: string
    ): Promise<Pick<IItem, "name" | "id" | "created_by"> | null>;
} & mongoose.Model<IItem>;