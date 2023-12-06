"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    console.log("Global error handler", err);
    let statusCode = 500;
    let message = "Something Went Wrong!";
    let errorMessage = [];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        ({ statusCode, message, errorMessage } = simplifiedError);
    }
    else if (err instanceof ApiError_1.default) {
        ({ statusCode, message } = err);
        errorMessage = err.message ? [{ path: "", message: err.message }] : [];
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        errorMessage = simplifiedError.errorMessage;
        message = simplifiedError.message;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessage = err.message ? [{ path: "", message: err.message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessage,
        stack: config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
