import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Inventory } from 'src/inventory/inventory.entity';

@Entity()
@Unique(['code'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 13 })
  code: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  type: string;

  @Column({ nullable: false })
  points: number;

  @Column({ nullable: false })
  exp: number;

  @Column({ nullable: false, default: 0 })
  discards: number;

  @Column({ nullable: false, type: 'varchar', default: "" })
  imageData: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @OneToMany(() => Inventory, inventory => inventory.product)
  inventory: Inventory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}