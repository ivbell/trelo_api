import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsNumber()
  @IsNotEmpty()
  board_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}
