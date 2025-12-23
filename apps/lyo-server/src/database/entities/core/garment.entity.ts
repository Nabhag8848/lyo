import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { UserEntity } from './user.entity';
import { GenerationEntity } from './generation.entity';

@Entity({ name: 'garment', schema: 'core' })
@Unique(['user', 'garmentUrl', 'sourceUrl'])
export class GarmentEntity extends AbstractBaseEntity {
  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: false,
  })
  garmentUrl: string;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: false,
  })
  sourceUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  brandName: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  garmentBrandName: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  garmentName: string | null;

  @Column({ type: 'text', nullable: true })
  garmentDescription: string | null;

  @OneToMany(() => GenerationEntity, (generation) => generation.garment)
  generations: GenerationEntity[];
}
