import { Module, forwardRef } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './entities/list.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [
    TypeOrmModule.forFeature([ListEntity]),
    forwardRef(() => AuthModule),
  ],
})
export class ListModule {}
