import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_faqs')
export class ProductFAQ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionTitle: string;

  @Column('text')
  answer: string;

  @ManyToOne(() => Product, (product) => product.faqs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Column()
  productId: string;
}
