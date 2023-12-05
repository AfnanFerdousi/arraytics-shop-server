import { SortOrder } from "mongoose";

type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};

type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};

const paginationHelpers = (options: IOptions): IOptionsResult => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip: number = (page - 1) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    console.log(sortBy, sortOrder);
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};

export default paginationHelpers;
