"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        var _a;
        return {
            path: (_a = issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1]) === null || _a === void 0 ? void 0 : _a.toString(),
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessage: errors,
    };
};
exports.default = handleZodError;
