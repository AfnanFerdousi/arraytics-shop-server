import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
let server: Server;

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception ", err);
    process.exit(1);
});

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log(`DB Connected`);

        server = app.listen(config.port, () => {
            console.log(`Application  listening on port ${config.port}`);
        });
    } catch (error) {
        console.log("Failed to connect DB", error);
    }
    process.on("unhandledRejection", (error) => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

main();
