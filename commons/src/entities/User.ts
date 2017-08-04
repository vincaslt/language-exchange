import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as Models from '../models'

@Entity()
export class User implements Models.User {
  
  @PrimaryGeneratedColumn()
  public id: number
  
  @Column()
  public username: string

  constructor(username?: string) {
    if (username) {
      this.username = username
    }
  }
}