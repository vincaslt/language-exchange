import { ConnectionOptions } from 'typeorm'
import { Entities } from 'language-exchange-commons'

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