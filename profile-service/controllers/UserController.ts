import {
  InternalServerError,
  BadRequestError,
  JsonController,
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
  public async createUser(@Body() user: Dto.Registration) {
    try {
      const userRepository = getEntityManager().getRepository(Entities.User)
      const newUser = new Entities.User()
      newUser.username = user.username
      newUser.password = user.password
      const savedUser = await userRepository.persist(newUser)
      return true
    } catch (error) {
      throw new BadRequestError('User could not be created')
    }
  }

  @Get('/user')
  public user(@CurrentUser({ required: true }) user: Models.User) {
    return user
  }

  @Post('/login')
  public async login(@Body() { username, password }: Dto.Login) {
    const userRepository = getEntityManager().getRepository(Entities.User)
    const user = await userRepository.findOne({ username })
    if ((!!user && user.verifyPassword(password))) {
      const token = jwt.sign({ id: user.id }, jwtSecret)
      return { token }
    } else {
      throw new BadRequestError('Invalid credentials')
    }
  }
}