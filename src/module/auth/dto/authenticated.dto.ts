import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticatedDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
