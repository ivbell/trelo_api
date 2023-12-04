import { UserEntity } from '@/src/module/user/entities/user.entity';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(UserEntity, [
  'created',
  'updated',
  'deletedAt',
  'id',
]) {
  @IsString()
  @IsNotEmpty()
  password_confirm: string;
}
