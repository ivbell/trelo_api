import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepo: Repository<CardEntity>,
  ) {}
  async create(
    dto: CreateCardDto,
    user_id: number,
  ): Promise<{
    message: string;
    data: CardEntity;
  }> {
    return {
      data: await this.cardRepo.save({
        board_id: dto.boardId,
        card_name: dto.nameCard,
        user_id,
      }),
      message: 'Card created',
    };
  }

  async delete(
    user_id: number,
    cardId: number,
    boarId: number,
  ): Promise<{ data: CardEntity; message: string }> {
    const card = await this.findBoardByQuery({
      board_id: boarId,
      id: cardId,
      user_id,
    });
    if (!card) {
      throw new ForbiddenException();
    }
    return {
      data: await this.cardRepo.softRemove(card),
      message: 'Card delete',
    };
  }

  async update(
    cardNewName: string,
    cardId: number,
    boardId: number,
    user_id: number,
  ): Promise<{ data: CardEntity; message: string }> {
    const card = await this.findBoardByQuery({
      user_id,
      id: cardId,
      board_id: boardId,
    });
    if (!card) {
      throw new ForbiddenException();
    }
    return {
      data: await this.cardRepo.save({ ...card, card_name: cardNewName }),
      message: 'Card update',
    };
  }

  async findOne(
    user_id: number,
    boardId: number,
  ): Promise<{
    data: CardEntity;
  }> {
    const card = await this.findBoardByQuery({
      user_id,
      id: boardId,
    });
    if (!card) {
      throw new ForbiddenException();
    }
    return {
      data: card,
    };
  }

  async findBoardByQuery(
    where: FindOptionsWhere<CardEntity>,
  ): Promise<CardEntity> {
    return this.cardRepo.findOneBy(where);
  }

  async findBoardsByQuery(
    options: FindManyOptions<CardEntity>,
  ): Promise<CardEntity[]> {
    return this.cardRepo.find(options);
  }
}
