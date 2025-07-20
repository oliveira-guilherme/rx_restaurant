import { Sequelize } from 'sequelize'

const logSql = (sql: string) => console.log('SQL executed: ', sql)
const dabatabase = process.env.DB_DATABASE || 'rx_restaurant'
const username = process.env.DB_USERNAME || 'postgres'
const password = process.env.DB_PASSWORD || 'postgres'
const port = Number(process.env.DB_PORT) || 5435

const sequelize = new Sequelize(dabatabase, username, password, {
  host: 'localhost',
  port,
  dialect: 'postgres',
  logging: logSql,
})

sequelize.sync({ force: false })

export default sequelize;