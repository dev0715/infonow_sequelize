import { Sequelize } from 'sequelize-typescript';
import GlobalConfigs from './configs';
const dbConfig = GlobalConfigs!.DatabaseConfigurations;
export const sequelize = new Sequelize({
    dialect: "mysql",
    ...dbConfig,
    models: [__dirname + '/models']
});