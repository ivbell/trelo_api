import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepo: Repository<BoardEntity>,
  ) {}

  async create(dto: CreateBoardDto, user_id: number): Promise<BoardEntity> {
    return await this.boardRepo.save({
      user_id,
      name_board: dto.nameBoard,
    });
  }

  async deleteBoard(user_id: number, board_id: number): Promise<BoardEntity> {
    const board = await this.findBoardByQuery({ id: board_id, user_id });
    if (!board) {
      throw new ForbiddenException();
    }
    await this.boardRepo.softRemove(board);
    return board;
  }

  async updateBoard(
    user_id: number,
    board_id: number,
    board_new_name: string,
  ): Promise<BoardEntity> {
    const board = await this.findBoardByQuery({ id: board_id, user_id });
    if (!board) {
      throw new ForbiddenException();
    }
    return await this.boardRepo.save({ ...board, name_board: board_new_name });
  }

  async findBoardByQuery(
    where: FindOptionsWhere<BoardEntity>,
  ): Promise<BoardEntity> {
    return this.boardRepo.findOneBy(where);
  }

  async findBoardsByQuery(
    options: FindManyOptions<BoardEntity>,
  ): Promise<BoardEntity[]> {
    return this.boardRepo.find(options);
  }
}
