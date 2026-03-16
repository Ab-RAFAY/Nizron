import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Column()
  productId: string;
}
