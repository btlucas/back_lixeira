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
export class Container extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  code: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: 'jsonb'})
  location: {
    cep: string,
    street: string,
    district: string,
    city: string,
    state: string
  }

  @Column({ nullable: false, type: 'varchar', length: 20 })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  capacityStatus: string;

  @Column({ nullable: false })
  totalCapacity: number;

  @Column({ nullable: false })
  usedCapacity: number;

  @Column({ nullable: false, default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}