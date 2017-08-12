import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as Models from '../models'

@Entity()
export class User implements Models.User {
  @PrimaryGeneratedColumn()
  public id: number
  
  @Column()
  public username: string

  @Column({ name: 'password' })
  private _password: string

  set password(password: string) {
    this._password = bcrypt.hashSync(password, 10)
  }

  get password(): string {
    return this._password
  }

  public verifyPassword(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password)
  }
}