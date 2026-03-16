import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { PricingPlan } from './pricing-plan.entity';

@Entity('pricing_bullets')
export class PricingBullet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => PricingPlan, (plan) => plan.bullets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pricingPlanId' })
  pricingPlan: Relation<PricingPlan>;

  @Column()
  pricingPlanId: string;
}
