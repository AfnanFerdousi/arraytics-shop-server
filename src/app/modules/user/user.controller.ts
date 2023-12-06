import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userSearchableFields } from "./user.constant";
import { paginationFields } from "../../../constant/pagination";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import userService from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userSearchableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await userService.getAllUserService(
        paginationOptions,
        filters
    );

    sendResponse<IUser[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully found user",
        data: result.data,
        meta: result.meta,
    });
});


const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.params;
    const updatedUser = await userService.updateUserService(email, req.body);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully updated user",
        data: updatedUser,
    });
})

export default {
    getAllUsers,
    updateUser
}