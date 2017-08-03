import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export interface UserModel {
  id: number,
  username: string
}

@Entity()
export class User implements UserModel {
  
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