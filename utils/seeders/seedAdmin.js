import { Admin } from '../../app/models/index.js';
import { errorLogger, infoLogger } from '../helpers/logger/logger.js';
import { config } from '../server/index.js';

const seedAdmin = async () => {
    try {

        const adminData = {
            name: "Soumik Ahammed",
            phone: config.SEEDER.PHONE,
            password: config.SEEDER.PASSWORD,
            role: config.SEEDER.ROLE,
        };

        const adminExists = await Admin.findOne({ phone: adminData.phone });
        if (!adminExists) {
            await Admin.create({ ...adminData });
            infoLogger.info("Admin data seeded successfully.");
        } else {
            infoLogger.info("Admin data already exists.");
        }
    } catch (error) {
        errorLogger.error(`Error seeding admin data: ${error.message}`);
    }
};

export default seedAdmin;