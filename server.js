const app = require("./app");
const { sequelize } = require("./utils/database");
const { logger } = require("./utils/logger");

const port = process.env.PORT || 8000;

// 🚀 🖥 Start Server
// prettier-ignore
(async function start() {
    try {
        await sequelize.sync(/*{ force: true }*/);
        logger.info('✅ Database Connected Successfully');
        app.listen(port, () => logger.info(`✅ ✨ Server Started on http://localhost:${port}`));
    } catch (error) {
        logger.error(`❌ Application Failed to start: ${error}`);
    }
}());
