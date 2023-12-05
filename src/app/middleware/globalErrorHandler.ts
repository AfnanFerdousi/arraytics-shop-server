import { ErrorRequestHandler } from "express";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import IGenericErrorMessage from "../../interfaces/error";
import handleCastError from "../../errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Global error handler", err);
    let statusCode = 500;
    let message = "Something Went Wrong!";
    let errorMessage: IGenericErrorMessage[] = [];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        ({ statusCode, message, errorMessage } = simplifiedError);
    } else if (err instanceof ApiError) {
        ({ statusCode, message } = err);
        errorMessage = err.message ? [{ path: "", message: err.message }] : [];
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        errorMessage = simplifiedError.errorMessage;
        message = simplifiedError.message;
    } else if (err instanceof Error) {
        message = err.message;
        errorMessage = err.message ? [{ path: "", message: err.message }] : [];
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessage,
        stack: config.env !== "production" ? err?.stack : undefined,
    });
};

export default globalErrorHandler;
