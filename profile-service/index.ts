import 'core-js'
import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { createConnection } from 'typeorm'
import * as Controllers from './controllers'
import { dbconfig } from './dbconfig'

console.info('Initializing controllers')
const app = createExpressServer({
  controllers: Object.values(Controllers)
})

console.info('Connecting to database')
createConnection(dbconfig).then(() => {
  app.listen(process.env.PORT, () => {
    console.info(`Server listening on port ${process.env.PORT}!`)
  })
})
