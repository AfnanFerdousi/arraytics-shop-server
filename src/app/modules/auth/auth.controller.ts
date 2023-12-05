import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import { Request, Response } from "express";
import authService from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await authService.createUserService(userData);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully created user",
        data: user,
    });
});

export default {
    createUser,
}
