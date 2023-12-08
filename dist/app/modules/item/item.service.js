"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelpers_1 = __importDefault(require("../../../helpers/paginationHelpers"));
const item_model_1 = __importDefault(require("./item.model"));
const createItemService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_model_1.default.isItemExist(data.name);
    console.log(data);
    if (item) {
        throw new Error("Item already exists");
    }
    else {
        return yield item_model_1.default.create(data);
    }
});
const getAllItemService = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchText } = filters, filtersData = __rest(filters, ["searchText"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.default)(paginationOptions);
    const andConditions = [];
    if (searchText) {
        andConditions.push({
            $or: ["name"].map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield item_model_1.default
        .find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield item_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateItemService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_model_1.default.findOneAndUpdate({ _id: id }, body, {
        new: true,
    });
    return item;
});
const deleteItemService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_model_1.default.findOne({ _id: id });
    if (!item) {
        throw new Error("Item not found");
    }
    else {
        return yield item_model_1.default.deleteOne({ _id: id });
    }
});
exports.default = {
    createItemService,
    getAllItemService,
    updateItemService,
    deleteItemService
};
