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
import { Dto, Entities } from 'language-exchange-commons'
import { jwtSecret } from '../constants'
import { dbconfig } from '../dbconfig'

@JsonController()
export class UserController {

  @Put('/user')
  public async createUser(@Body() user: Entities.User) {
    try {
      const userRepository = getEntityManager().getRepository(Entities.User)
      const savedUser = await userRepository.persist(user)
      return 'Hello ' + savedUser.username
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/user')
  public user(@CurrentUser({ required: true }) user: Entities.UserModel) {
    return user
  }

  @Post('/login')
  public async login(@Body() dto: Dto.Login) {
    const userRepository = getEntityManager().getRepository(Entities.User)
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