import { config } from 'dotenv';
config();

export namespace Configurations {
    export const DatabaseConfigurations = {
        "host": process.env.DATABASE_HOST,
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
    }
}
