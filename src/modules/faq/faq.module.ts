import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQService } from './faq.service';
import { FAQController } from './faq.controller';
import { FAQ } from './entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FAQ])],
  controllers: [FAQController],
  providers: [FAQService],
})
export class FAQModule {}
