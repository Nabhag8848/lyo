import { Column, Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { GarmentEntity } from './garment.entity';
import { AvatarEntity } from './avatar.entity';
import { UserEntity } from './user.entity';
import { JobStatus } from '../../@types';

@Entity({ name: 'generation', schema: 'core' })
@Unique(['jobId'])
export class GenerationEntity extends AbstractBaseEntity {
  @Column({
    type: 'uuid',
    nullable: false,
    comment: 'External provider reference',
  })
  jobId: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  key: string | null;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bucketName: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contentType: string | null;

  @ManyToOne(() => GarmentEntity, { nullable: false })
  @JoinColumn({ name: 'garmentId' })
  garment: GarmentEntity;

  @ManyToOne(() => AvatarEntity, { nullable: false })
  @JoinColumn({ name: 'avatarId' })
  avatar: AvatarEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.STARTING,
    nullable: false,
  })
  status: JobStatus;
}
