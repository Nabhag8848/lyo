import { Column, Entity, Index } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { AuthProvider } from '../../@types';

@Entity({ name: 'user', schema: 'core' })
export class UserEntity extends AbstractBaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  picture: string;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
  provider: AuthProvider;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  providerId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @Column({ type: 'varchar', length: 512, nullable: true })
  googleAccessToken: string | null;
}
