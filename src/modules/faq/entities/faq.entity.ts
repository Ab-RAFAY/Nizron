import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('faqs')
export class FAQ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionTitle: string;

  @Column()
  category: string;

  @Column('text')
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
