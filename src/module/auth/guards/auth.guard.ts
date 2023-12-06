import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { serializePublicUserHelper } from '../../user/helpers/serialize-public-user.helper';
import { AuthService } from '../auth.service';
import { sessionConst } from '../const/session.const';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const [payload, user] = await this.authService.validate(token);
    if (payload) {
      request['user'] = serializePublicUserHelper(user);
    }
    return payload;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const cookies = request.unsignCookie(
      request.cookies[sessionConst.session_name_cookie],
    );
    if (!cookies.valid) {
      return undefined;
    }
    return cookies.value;
  }
}
