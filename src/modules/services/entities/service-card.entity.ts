import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { ServiceEntity } from './service.entity';

@Entity('service_cards')
export class ServiceCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => ServiceEntity, (service) => service.serviceCards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service: Relation<ServiceEntity>;

  @Column()
  serviceId: string;
}
