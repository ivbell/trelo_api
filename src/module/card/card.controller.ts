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
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MainResponseType } from '@/src/common/types/main-response.type';
import { CardEntity } from './entities/card.entity';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AuthGuard)
  @Post('/createСard')
  create(@Body() createCardDto: CreateCardDto, @Req() req: FastifyRequest) {
    return this.cardService.create(createCardDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteCard')
  async delete(
    @Req() req: FastifyRequest,
    @Query() query,
  ): Promise<MainResponseType<CardEntity>> {
    return {
      data: await this.cardService.delete(
        req.user.id,
        query.cardId,
        query.boarId,
      ),
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @Put('/renameCard')
  async updateCard(
    @Req() req: FastifyRequest,
    @Query() query,
  ): Promise<MainResponseType<CardEntity>> {
    return {
      data: await this.cardService.update(
        query.cardNewName,
        query.cardId,
        query.boardId,
        req.user.id,
      ),
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getCard')
  async getOne(
    @Req() req: FastifyRequest,
    @Query() query,
  ): Promise<MainResponseType<CardEntity>> {
    return {
      data: await this.cardService.findOne(req.user.id, query.boardId),
      statusCode: HttpStatus.OK,
    };
  }
}
