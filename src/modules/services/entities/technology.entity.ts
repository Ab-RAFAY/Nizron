import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { ServiceEntity } from './service.entity';

@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ServiceEntity, (service) => service.technologies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service: Relation<ServiceEntity>;

  @Column()
  serviceId: string;
}
