import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { ReferencePhotoEntity } from './reference-photo.entity';
import { GenerationEntity } from './generation.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'avatar', schema: 'core' })
export class AvatarEntity extends AbstractBaseEntity {
  @ManyToOne(() => ReferencePhotoEntity, { nullable: false })
  @JoinColumn({ name: 'referencePhotoId' })
  referencePhoto: ReferencePhotoEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  key: string;

  @Column({ type: 'varchar', length: 63, nullable: false })
  bucketName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contentType: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isSelected: boolean;

  @OneToMany(() => GenerationEntity, (generation) => generation.avatar)
  generations: GenerationEntity[];
}
