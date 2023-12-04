import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from './entities/board.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    forwardRef(() => AuthModule),
  ],
})
export class BoardModule {}
