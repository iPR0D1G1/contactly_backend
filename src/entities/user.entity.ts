import BaseEntity from './base.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { ContactEntity } from './contact.entity';
// import { RoleEntity } from 'entities';
// import { Role } from 'models';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(type => ContactEntity, contact => contact.user)
  contacts?: ContactEntity;

  // @ManyToOne(type => RoleEntity, role => role.users)
  // role: Role;

}
