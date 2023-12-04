import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Post('/createBoard')
  create(@Body() createBoardDto: CreateBoardDto, @Req() req: FastifyRequest) {
    return this.boardService.create(createBoardDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/getBoard')
  async findAllBoardByUser(@Req() req: FastifyRequest) {
    const data = await this.boardService.findBoardsByQuery({
      where: {
        user_id: req.user.id,
      },
    });
    return { data };
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteBoard')
  async deleteBoard(@Query() query, @Req() req: FastifyRequest) {
    const data = await this.boardService.deleteBoard(
      req.user.id,
      +query.boardId,
    );
    return { data, message: 'Board deleted' };
  }

  @UseGuards(AuthGuard)
  @Put('/renameBoard')
  async updateBoard(@Query() query, @Req() req: FastifyRequest) {
    const data = await this.boardService.updateBoard(
      req.user.id,
      +query.boardId,
      query.boardNewName,
    );
    return {
      data,
      message: 'Board update',
    };
  }
}
