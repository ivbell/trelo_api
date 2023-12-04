import { BaseEntity } from '@/src/common/entity/BaseEntity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({
  schema: 'alena_servis',
  name: 'profile',
})
export class UserEntity extends BaseEntity {
  @Column({
    nullable: false,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Column({
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export type IUserEntity = UserEntity;
