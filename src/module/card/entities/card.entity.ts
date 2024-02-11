import { BaseEntity } from '@/src/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'card',
})
export class CardEntity extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  board_id: number;

  @Column()
  card_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;
}
