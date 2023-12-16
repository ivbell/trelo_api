import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { MainResponseType } from '@/src/common/types/main-response.type';
import { FastifyRequest } from 'fastify';
import { ListEntity } from './entities/list.entity';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateListDto } from './dto/create-list.dto';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(AuthGuard)
  @Get('lists')
  async getListByCardId(
    @Req() req: FastifyRequest,
    @Query('boardId') boardId: number,
  ): Promise<MainResponseType<ListEntity[]>> {
    const lists = await this.listService.findAllByRepoId(boardId, req.user.id);
    return {
      statusCode: HttpStatus.OK,
      data: lists,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('list/update')
  async updateList(
    @Req() req: FastifyRequest,
    @Query('listId') listId: number,
    @Body() dto: UpdateListDto,
  ): Promise<MainResponseType<ListEntity>> {
    return {
      data: await this.listService.updateList(listId, req.user.id, dto),
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('/list/create')
  async createList(
    @Body() dto: CreateListDto,
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<ListEntity>> {
    return {
      data: await this.listService.createList(dto, req.user.id),
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('/list')
  async deleteList(
    @Query('listId') listId: number,
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<ListEntity>> {
    return {
      data: await this.listService.deleteList(listId, req.user.id),
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async getContent(
    @Query('listId') listId: number,
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<ListEntity>> {
    return {
      data: await this.listService.getOne(listId, req.user.id),
      statusCode: HttpStatus.OK,
    };
  }
}
