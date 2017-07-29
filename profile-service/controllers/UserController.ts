import { Controller, Get, Post, Body, Put } from 'routing-controllers'
import { getEntityManager } from 'typeorm'
import { User } from 'language-exchange-commons/entities'
import { dbconfig } from '../dbconfig'

@Controller()
export class UserController {

  @Put('/user')
  private async createUser(@Body() user: User) {
    try {
      const userRepository = getEntityManager().getRepository(User)
      // const newUser = userRepository.create(user)
      const savedUser = await userRepository.persist(user)
      return 'Hello ' + savedUser.name
    } catch (error) {
      console.error(error)
    }
  }
}