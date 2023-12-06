/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type IItem = {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    created_by: string;
};

export type ItemModel = {
    isItemExist(
        _id: string
    ): Promise<Pick<IItem, "name" | "_id" | "created_by"> | null>;
} & mongoose.Model<IItem>;

export type IItemFilters = {
    name?: string;
    searchText?: string;
};