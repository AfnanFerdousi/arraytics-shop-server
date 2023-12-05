import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import { Request, Response } from "express";
import authService from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";
import config from "../../../config";

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

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await authService.loginUserService(loginData);
  const cookieOptions = {
      secure: config.env === "production" ? true : false,
      httpOnly: true,
  };

    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    if ("refreshToken" in result) {
        delete result?.refreshToken;
    }

    sendResponse<any>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully logged in",
        data: result,
    })
})

export default {
    createUser,
    loginUser
}
