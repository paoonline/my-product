import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { ProductTranslation } from './product-translation.entity';
  
  @Entity('product')
  export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'NOW()',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'NOW()',
    })
    updatedAt: Date;
  
    // One product can have many translations
    @OneToMany(
      () => ProductTranslation,
      (translation) => translation.product,
      { cascade: true, eager: true },
    )
    translations: ProductTranslation[];
  }
  