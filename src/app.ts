import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.get("env");

app.get("/", (req: Request, res: Response) => {
    res.send("Arraytics shopping Server is running");
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route not found",
        errorMessages: [
            {
                path: "",
                message: "Api not found",
            },
        ],
    });
});
export default app;
