import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  public id: number
  
  @Column()
  public name: string

  constructor(name?: string) {
    this.name = name
  }
}