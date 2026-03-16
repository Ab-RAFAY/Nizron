import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Relation } from 'typeorm';
import { ServiceCard } from './service-card.entity';
import { Technology } from './technology.entity';
import { PricingPlan } from './pricing-plan.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @OneToMany(() => ServiceCard, (card) => card.service, { cascade: true })
  serviceCards: Relation<ServiceCard[]>;

  @OneToMany(() => Technology, (tech) => tech.service, { cascade: true })
  technologies: Relation<Technology[]>;

  @OneToMany(() => PricingPlan, (plan) => plan.service, { cascade: true })
  pricingPlans: Relation<PricingPlan[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
