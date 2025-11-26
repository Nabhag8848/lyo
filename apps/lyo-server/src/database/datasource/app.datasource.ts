import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();

export const createTypeOrmOptions = (): TypeOrmModuleOptions => {
  const databaseRoot = join(
    process.cwd(),
    'apps',
    'lyo-server',
    'src',
    'database'
  );
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_NAME || 'postgres',

    entities: [join(databaseRoot, 'entities', '**', '*.entity.{ts,js}')],
    migrations: [join(databaseRoot, 'migrations', '**', '*.{ts,js}')],
    migrationsTableName: '__migrations__',
    migrationsRun: false,
    ssl: true,
    extra: {
      options: '-c search_path=public,core',
      ssl: {
        rejectUnauthorized: false,
      },
    },
    synchronize: false,
  };
};

export const AppDataSource = new DataSource({
  ...createTypeOrmOptions(),
} as DataSourceOptions);
