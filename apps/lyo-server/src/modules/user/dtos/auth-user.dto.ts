import { IsEmail, IsString, IsUUID } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;
}
