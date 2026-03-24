import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const databaseUrl = configService.get<string>('DATABASE_URL');

  // Base configuration
  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Temporarily enabled to sync new 'description' column — will disable after migration
    logging: !isProduction,
    ssl: {
      rejectUnauthorized: false, // Essential for Neon and similar serverless Postgres
    },
    // Pool settings recommended for serverless/pooled environments like Neon
    extra: {
      max: 20, // Connection pool limit
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  };

  // Support both unified DATABASE_URL and individual params
  if (databaseUrl) {
    return {
      ...config,
      url: databaseUrl,
    };
  }

  return {
    ...config,
    host: configService.get<string>('DB_HOST'),
    port: Number(configService.get<number>('DB_PORT', 5432)),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
  };
};
