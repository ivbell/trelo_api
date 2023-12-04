import { Module, forwardRef } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    TypeOrmModule.forFeature([CardEntity]),
    forwardRef(() => AuthModule),
  ],
})
export class CardModule {}
