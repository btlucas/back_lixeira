import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: 0 })
  points: number;

  @Column({ nullable: false, default: 0 })
  exp: number;

  @Column({ nullable: false, default: 0 })
  discards: number;

  @ManyToOne(() => Product, product => product.inventory)
  product: Product;

  @ManyToOne(() => User, user => user.inventory)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}