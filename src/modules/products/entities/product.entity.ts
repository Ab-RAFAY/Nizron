import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Relation } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductFAQ } from './product-faq.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('text')
  description: string;

  @Column('text', { array: true })
  features: string[];

  @Column({ nullable: true })
  productUsePdf: string;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: Relation<ProductImage[]>;

  @OneToMany(() => ProductFAQ, (faq) => faq.product, { cascade: true })
  faqs: Relation<ProductFAQ[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
