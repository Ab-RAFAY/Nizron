import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Relation } from 'typeorm';
import { ServiceEntity } from './service.entity';
import { PricingBullet } from './pricing-bullet.entity';

@Entity('pricing_plans')
export class PricingPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => ServiceEntity, (service) => service.pricingPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service: Relation<ServiceEntity>;

  @Column()
  serviceId: string;

  @OneToMany(() => PricingBullet, (bullet) => bullet.pricingPlan, { cascade: true })
  bullets: Relation<PricingBullet[]>;
}
