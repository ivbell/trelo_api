import { BaseEntity } from '@/src/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ListEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  board_id: number;

  @Column()
  user_id: number;

  @Column({
    nullable: true,
  })
  card_id: number;
}
