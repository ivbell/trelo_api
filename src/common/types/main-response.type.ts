import { HttpStatus } from '@nestjs/common';

export type MainResponseType<T = never> = {
  statusCode: HttpStatus | number;
  message?: string;
  data?: T;
};
