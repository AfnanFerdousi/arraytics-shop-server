import { SortOrder } from "mongoose";
import paginationHelpers from "../../../helpers/paginationHelpers";
import IGenericResponse from "../../../interfaces/genericResponse";
import IPaginationOptions from "../../../interfaces/pagination";
import pick from "../../../shared/pick";
import { IItem, IItemFilters } from "./item.interface";
import Item from "./item.model";


const createItemService = async (data: IItem) => {
    const item = await Item.isItemExist(data.name);
    console.log(data)
    if (item) {
        throw new Error("Item already exists");
    }else {
        return await Item.create(data);
    }
}

const getAllItemService = async (
    paginationOptions: IPaginationOptions,
    filters: IItemFilters
): Promise<IGenericResponse<IItem[]>> => {
    const { searchText, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers(paginationOptions);
    
    const andConditions = [];
    if (searchText) {
        andConditions.push({
            $or: ["name"].map((field: any) => ({
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

    const result = await Item
        .find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Item.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };

};

const updateItemService = async (
    id: string,
    body: Partial<IItem>
) => {
    const item = await Item.findOneAndUpdate({ _id: id }, body, {
        new: true,
    });
    return item;
}

const deleteItemService = async(
    id: string    
) => {
    const item = await Item.isItemExist(id);
    if (!item) {
        throw new Error("Item not found");
    } else {
        return await Item.deleteOne({ _id: id });
    }
}

export default {
    createItemService,
    getAllItemService,
    updateItemService, 
    deleteItemService
};