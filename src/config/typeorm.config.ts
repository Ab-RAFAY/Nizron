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
    /**
     * DATABASE SYNC STRATEGY:
     * - In Development: synchronize: true (Automatically updates DB columns)
     * - In Production: synchronize: false (Protects live data)
     * 
     * HOW TO UPDATE DATABASE IN FUTURE:
     * 1. Add your new field in the .entity.ts file.
     * 2. Temporarily change the line below to 'synchronize: true'.
     * 3. Push to GitHub and wait for Vercel to deploy once.
     * 4. Change it back to 'synchronize: !isProduction' immediately after.
     */
    synchronize: !isProduction, 
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
