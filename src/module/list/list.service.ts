import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListEntity } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepo: Repository<ListEntity>,
  ) {}

  async findAllByRepoId(id: number, user_id: number): Promise<ListEntity[]> {
    return await this.listRepo.find({
      where: {
        user_id,
        board_id: id,
      },
    });
  }

  async updateList(id: number, user_id: number, dto: UpdateListDto) {
    const list = await this.listRepo.findOneBy({
      id,
      user_id,
    });
    if (!list) {
      throw new ForbiddenException();
    }
    return await this.listRepo.save({ ...list, ...dto });
  }

  async createList(dto: CreateListDto, user_id: number): Promise<ListEntity> {
    try {
      return await this.listRepo.save({ ...dto, user_id });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async deleteList(id: number, user_id: number): Promise<ListEntity> {
    try {
      const list = await this.listRepo.findOne({
        where: {
          id,
          user_id,
        },
      });
      if (!list) {
        throw new ForbiddenException();
      }
      return await this.listRepo.softRemove(list);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getOne(id: number, user_id: number): Promise<ListEntity> {
    return await this.listRepo.findOneBy({
      id,
      user_id,
    });
  }
}
