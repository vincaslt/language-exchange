import { ConnectionOptions } from 'typeorm'
import * as Entities from 'language-exchange-commons/dist/entities'

export const dbconfig: ConnectionOptions = {
  autoSchemaSync: true,
  database: 'language-exchange',
  entities: Object.values(Entities),
  host: 'localhost',
  password: 'root',
  port: 3306,
  type: 'mysql',
  username: 'root'
}