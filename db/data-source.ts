require("dotenv").config();
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: ['dist/**/**.entity.js'],
            migrations: ['dist/db/migrations/*.js'],
            synchronize: true,
            logging: false,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;