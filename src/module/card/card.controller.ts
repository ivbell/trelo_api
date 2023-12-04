import {
  Body,
  Controller,
  Delete,
  Get,
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
  delete(@Req() req: FastifyRequest, @Query() query) {
    return this.cardService.delete(req.user.id, query.cardId, query.boarId);
  }

  @UseGuards(AuthGuard)
  @Put('/renameCard')
  updateCard(@Req() req: FastifyRequest, @Query() query) {
    return this.cardService.update(
      query.cardNewName,
      query.cardId,
      query.boardId,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/getCard')
  getOne(@Req() req: FastifyRequest, @Query() query) {
    return this.cardService.findOne(req.user.id, query.boardId);
  }
}
