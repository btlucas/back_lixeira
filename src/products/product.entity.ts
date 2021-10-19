import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // @Column({ name: 'imageData', type: 'bytea', nullable: false })
  // imageData: Buffer;

  @Column({ name: 'imageData', type: 'varchar', nullable: false, length: 10 })
  imageData: string;

  @Column({ nullable: false })
  points: number;

  @Column({ nullable: false, default: 0 })
  discards: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}