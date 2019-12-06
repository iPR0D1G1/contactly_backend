import BaseEntity from './base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ContactEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  phonenumber: string;

  @Column()
  description: string;

  @Column({})
  email: string;

  @Column({
    nullable:true,
  })
  avatar_url: string;

  @Column({
    type: Boolean,
  })
  is_favorite: boolean = false;

  @ManyToOne(type => UserEntity, user => user.contacts)
  user: UserEntity
}
