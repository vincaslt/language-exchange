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
import * as Dto from 'language-exchange-commons/dist/dto'
import * as Entities from 'language-exchange-commons/dist/entities'
import * as Models from 'language-exchange-commons/dist/models'
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
  public user( @CurrentUser({ required: true }) user: Models.User) {
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