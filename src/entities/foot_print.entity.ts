import BaseEntity from './base.entity';
import { Entity, Column, ManyToOne, ColumnType } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class FootPrint extends BaseEntity {
  @Column()
  ip: string;

  @Column()
  browser: string;

  @Column()
  lat: string;

  @Column()
  device_info: string;

  @Column()
  lng: string;
}
