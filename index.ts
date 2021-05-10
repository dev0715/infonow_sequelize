
import { Sequelize } from 'sequelize-typescript';
import GlobalConfigs from './configs';
const dbConfig = GlobalConfigs!.DatabaseConfigurations;

export const sequelize = new Sequelize({
    dialect: "mysql",
    ...dbConfig,
    models: [__dirname + '/models']
});


export * from './models/Admin'
export * from './models/Document'
export * from './models/Meeting'
export * from './models/Participant'
export * from './models/Role'
export * from './models/Student'
export * from './models/Teacher'
export * from './models/TeacherStudent'
export * from './models/User'
