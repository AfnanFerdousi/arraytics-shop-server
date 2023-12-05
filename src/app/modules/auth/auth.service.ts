import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { createToken, verifyToken } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUserService = async (body: IUser): Promise<IUser> => {
    const exist = await User.isUserExist(body.email);
    if(exist) {
        throw new Error("User already exist");
    }else{
        const user = await User.create(body);
        return user;
    }
};

const loginUserService = async (
    payload: ILoginUser
): Promise<ILoginUserResponse> => {
    const user = await User.isUserExist(payload.email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    if (
        user.password &&
        !(await User.isPasswordMatched(payload.password, user.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    const { email, name, id } = user;
    const accessToken = createToken(
        { email, name, id },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = createToken(
        { email, name, id },
        config.jwt.jwt_refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};


const refreshTokenService = async (
    token: string
): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try {
        verifiedToken = verifyToken(
            token,
            config.jwt.jwt_refresh_secret as Secret
        );
    } catch (e) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
    }

    const { email } = verifiedToken;
    const user = await User.isUserExist(email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
    }

    const newAccessToken = createToken(
        { id: user?.id, email },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    return { accessToken: newAccessToken };
};

export default {
    createUserService,
    loginUserService,
    refreshTokenService,
}