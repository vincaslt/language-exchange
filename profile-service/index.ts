import 'core-js'
import 'reflect-metadata'
import * as express from 'express'
import { useExpressServer, RoutingControllersOptions } from 'routing-controllers'
import { createConnection } from 'typeorm'
import * as cors from 'cors'
import * as Controllers from './controllers'
import { dbconfig } from './dbconfig'
import { initializeAuth } from './authentication'

const app = express()
const serverOptions: RoutingControllersOptions = {}

app.use(cors())

console.info('Setting up authentication')
app.use(initializeAuth(serverOptions))

console.info('Initializing controllers')
serverOptions.controllers = Object.values(Controllers)

console.info('Connecting to database')
createConnection(dbconfig).then(() => {
  useExpressServer(app, serverOptions)
  app.listen(process.env.PORT, () => {
    console.info(`Server listening on port ${process.env.PORT}!`)
  })
})
