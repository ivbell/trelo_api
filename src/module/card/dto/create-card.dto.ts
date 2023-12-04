import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  @IsNotEmpty()
  boardId: number;

  @IsString()
  @IsNotEmpty()
  nameCard: string;
}
