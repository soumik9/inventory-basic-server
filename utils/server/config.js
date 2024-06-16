import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Check required environment variables
const requiredEnvVars = [
    'ENV',
    'PORT',
    'MONGOOSE_URI',
    'DATABASE_NAME',
    'TOKEN_SECRET',
    'TOKEN_SECRET_EXP',
    'BCRYPT_SALT_ROUND',
    'SEED_ADMIN_PHONE',
    'SEED_ADMIN_PASSWORD',
    'SEED_ADMIN_ROLE',
];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,

    MONGOOSE_URI: process.env.MONGOOSE_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,

    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_SECRET_EXP: process.env.TOKEN_SECRET_EXP,

    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,

    SEEDER: {
        PHONE: process.env.SEED_ADMIN_PHONE,
        PASSWORD: process.env.SEED_ADMIN_PASSWORD,
        ROLE: process.env.SEED_ADMIN_ROLE,
    },
};
