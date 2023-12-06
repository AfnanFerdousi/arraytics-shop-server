import { SortOrder } from "mongoose";
import paginationHelpers from "../../../helpers/paginationHelpers";
import IGenericResponse from "../../../interfaces/genericResponse";
import IPaginationOptions from "../../../interfaces/pagination";
import { userSearchableFields } from "./user.constant";
import { IUser, IUserFilters } from "./user.interface";
import User from "./user.model";

const getAllUserService = async (
    paginationOptions: IPaginationOptions,
    filters: IUserFilters
): Promise<IGenericResponse<IUser[]>> => {
    const { searchText, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers(paginationOptions);

    const andConditions = [];
    if (searchText) {
        andConditions.push({
            $or: userSearchableFields.map((field: any) => ({
                [field]: {
                    $regex: searchText,
                    $options: "i",
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const updateUserService = async (
    email: string,
    body: Partial<IUser>
): Promise<IUser | null> => {
    const result = await User.findOneAndUpdate({ email: email }, body, {
        new: true,
    });
    return result;
};


export default {
    getAllUserService,
    updateUserService
}