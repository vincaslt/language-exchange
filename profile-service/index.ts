import 'core-js'
import 'reflect-metadata'
import * as fs from 'fs'
import * as https from 'https'
import * as express from 'express'
import { useExpressServer, RoutingControllersOptions } from 'routing-controllers'
import { createConnection } from 'typeorm'
import * as cors from 'cors'
import * as Controllers from './controllers'
import { dbconfig } from './dbconfig'
import { initializeAuth } from './authentication'

const serverOptions: RoutingControllersOptions = {}
const app = express()

app.use(cors())

console.info('Setting up authentication')
app.use(initializeAuth(serverOptions))

console.info('Initializing controllers')
serverOptions.controllers = Object.values(Controllers)

console.info('Connecting to database')
createConnection(dbconfig).then(() => {
  useExpressServer(app, serverOptions)
  const server = https.createServer({
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
  }, app)
  server.listen(process.env.PORT, () => {
    console.info(`Server listening on port ${process.env.PORT}!`)
  })
})
