import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserProfileDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  @IsString()
  firstName: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  lastName: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  picture: string | null;

  @Expose()
  @IsDate()
  createdAt: Date;
}
