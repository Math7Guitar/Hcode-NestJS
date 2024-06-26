import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/usr/entities/usr.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [User],
  synchronize: false,
  migrations: [`${__dirname}/migrations/*.ts`],
});

export default dataSource;
