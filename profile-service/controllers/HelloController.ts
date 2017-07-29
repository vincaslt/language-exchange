import { Controller, Get, Post, Param } from 'routing-controllers'
import { createConnection } from 'typeorm'
import { User } from '../entities/User'

@Controller()
export class HelloController {

  @Get('/hello/:name')
  private sayHello(@Param('name') name: string) {
    return createConnection({
      autoSchemaSync: true,
      database: 'language-exchange',
      entities: [
        User
      ],
      host: 'localhost',
      password: 'root',
      port: 3306,
      type: 'mysql',
      username: 'root'
    }).then(connection => {
      const user = new User(name)

      return connection.manager
        .persist(user)
        .then(savedUser => {
          return 'Hello ' + name
        })
    }).catch(error => console.info(error))
  }
}