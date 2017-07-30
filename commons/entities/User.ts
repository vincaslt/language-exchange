import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  public id: number
  
  @Column()
  public username: string

  constructor(username?: string) {
    this.username = username
  }
}