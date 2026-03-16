import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { getTypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './modules/teams/teams.module';
import { MembersModule } from './modules/members/members.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicesModule } from './modules/services/services.module';
import { FAQModule } from './modules/faq/faq.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    MembersModule,
    ProductsModule,
    ServicesModule,
    FAQModule,
    UploadsModule,
  ],
})
export class AppModule {}
