import { MainResponseType } from '@/src/common/types/main-response.type';
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
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../auth/auth.service';
import { sessionConst } from '../auth/const/session.const';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/registration')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<MainResponseType<UserPublicType>> {
    const user = serializePublicUserHelper(
      await this.userService.create(createUserDto),
    );
    const jwt = await this.authService.authenticatedUser({
      username: user.username,
      password: createUserDto.password,
    });
    response.setCookie(sessionConst.session_name_cookie, jwt, {
      path: '/',
      signed: true,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    return {
      data: user,
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
