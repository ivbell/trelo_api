import { MainResponseType } from '@/src/common/types/main-response.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Post('/createBoard')
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<BoardEntity>> {
    return {
      data: await this.boardService.create(createBoardDto, req.user.id),
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getBoard')
  async findAllBoardByUser(
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<BoardEntity[]>> {
    const data = await this.boardService.findBoardsByQuery({
      where: {
        user_id: req.user.id,
      },
    });
    return { data, statusCode: HttpStatus.OK };
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteBoard')
  async deleteBoard(
    @Query() query,
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<BoardEntity>> {
    const data = await this.boardService.deleteBoard(
      req.user.id,
      +query.boardId,
    );
    return { data, message: 'Board deleted', statusCode: HttpStatus.OK };
  }

  @UseGuards(AuthGuard)
  @Put('/renameBoard')
  async updateBoard(
    @Query() query,
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<BoardEntity>> {
    const data = await this.boardService.updateBoard(
      req.user.id,
      +query.boardId,
      query.boardNewName,
    );
    return {
      data,
      message: 'Board update',
      statusCode: HttpStatus.OK,
    };
  }
}
