import {
  InternalServerError,
  BadRequestError,
  JsonController,
  UseBefore,
  CurrentUser,
  Get, Post, Body, Put
} from 'routing-controllers'
import * as jwt from 'jsonwebtoken'
import { getEntityManager } from 'typeorm'
import * as passport from 'passport'
import { User } from 'language-exchange-commons/entities'
import { Login } from 'language-exchange-commons/dto'
import { jwtSecret } from '../constants'
import { dbconfig } from '../dbconfig'

@JsonController()
export class UserController {

  @Put('/user')
  public async createUser(@Body() user: User) {
    try {
      const userRepository = getEntityManager().getRepository(User)
      const savedUser = await userRepository.persist(user)
      return 'Hello ' + savedUser.username
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/user')
  public user(@CurrentUser({ required: true }) user: User) {
    return user
  }

  @Post('/login')
  public async login(@Body() dto: Login) {
    const userRepository = getEntityManager().getRepository(User)
    try {
      const user = await userRepository.findOne({ username: dto.username })
      if (user) {
        const token = jwt.sign({ id: user.id }, jwtSecret)
        return { token }
      }
      return new BadRequestError('invalid credentials')
    } catch (error) {
      return new InternalServerError(error)
    }
  }
}