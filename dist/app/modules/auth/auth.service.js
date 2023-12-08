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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUserService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.isUserExist(body.email);
    if (exist) {
        throw new Error("User already exist");
    }
    else {
        const user = yield user_model_1.default.create(body);
        return user;
    }
});
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExist(payload.email);
    console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (user.password &&
        !(yield user_model_1.default.isPasswordMatched(payload.password, user.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    const { email, name, _id } = user;
    const accessToken = (0, jwtHelpers_1.createToken)({ email, name, _id }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)({ email, name, _id }, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        email,
    };
});
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.jwt_refresh_secret);
    }
    catch (e) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { email } = verifiedToken;
    const user = yield user_model_1.default.isUserExist(email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist!");
    }
    const newAccessToken = (0, jwtHelpers_1.createToken)({ _id: user === null || user === void 0 ? void 0 : user._id, email }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
});
exports.default = {
    createUserService,
    loginUserService,
    refreshTokenService,
};
