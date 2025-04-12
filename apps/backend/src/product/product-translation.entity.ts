import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
  } from 'typeorm';
  import { Product } from './product.entity';
  
  @Entity('product_translation')
  @Unique(['product', 'lang'])
  export class ProductTranslation {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Unique(['name'])
    @Column({ length: 50 })
    name: string;
  
    @Column({ length: 255, nullable: true })
    description?: string;
  
    @Column({ length: 2 })
    lang: string;
  
    // Many translations belong to one product.
    @ManyToOne(() => Product, (product) => product.translations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;
  }
  