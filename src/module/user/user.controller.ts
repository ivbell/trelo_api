import { serializePublicUserHelper } from '@/src/module/user/helpers/serialize-public-user.helper';
import { UserPublicType } from '@/src/module/user/type/user-public.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { MainResponseType } from '@/src/common/types/main-response.type';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/registration')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<MainResponseType<UserPublicType>> {
    return {
      data: serializePublicUserHelper(
        await this.userService.create(createUserDto),
      ),
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async profile(
    @Req() req: FastifyRequest,
  ): Promise<MainResponseType<UserPublicType>> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
