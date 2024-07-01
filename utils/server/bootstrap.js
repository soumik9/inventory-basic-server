import connectToDatabase from "./connectToDatabase.js";
import config from "./config.js";
import seedAdmin from "../seeders/seedAdmin.js";
import { errorLogger, infoLogger } from "../helpers/logger/logger.js";

// server related works
process.on('uncaughtException', (error) => {
    logger.log("error", `Error uncaught exception server: ${error.message}`);
    process.exit(1);
});

// server listener
const bootstrap = async (app) => {
    let server;

    try {
        // server listen
        server = app.listen(config.PORT, async () => {
            infoLogger.info(`Listening on port http://localhost:${config.PORT}/api/sass/v1`);
            await connectToDatabase();
            seedAdmin();
        });
    } catch (error) {
        errorLogger.error(`Error creating server: ${error.message}`);
        process.exit(1);
    }
}

export default bootstrap;