import { BaseEntity } from '@/src/common/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'board',
})
export class BoardEntity extends BaseEntity {
  @Column({
    nullable: false,
  })
  user_id: number;

  @Column({ nullable: false })
  name_board: string;
}
