import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { UserEntity } from './user.entity';
import { AvatarEntity } from './avatar.entity';

@Entity({ name: 'referencePhoto', schema: 'core' })
export class ReferencePhotoEntity extends AbstractBaseEntity {
  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
    comment: 'S3 Object Key',
  })
  key: string;

  @Column({ type: 'varchar', length: 63, nullable: false })
  bucketName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contentType: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @OneToMany(() => AvatarEntity, (avatar) => avatar.referencePhoto)
  avatars: AvatarEntity[];
}
