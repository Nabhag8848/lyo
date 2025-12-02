import { IsString, IsEmail, IsOptional } from 'class-validator';

export class GoogleOAuthUserDto {
  @IsString()
  googleId: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  picture: string;

  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
