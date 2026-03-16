import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceEntity } from './entities/service.entity';
import { ServiceCard } from './entities/service-card.entity';
import { Technology } from './entities/technology.entity';
import { PricingPlan } from './entities/pricing-plan.entity';
import { PricingBullet } from './entities/pricing-bullet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      ServiceCard,
      Technology,
      PricingPlan,
      PricingBullet,
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
