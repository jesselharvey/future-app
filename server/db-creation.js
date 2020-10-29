require('dotenv').config();
const conn = require('./db')
// const sha512 = require('js-sha512')
// const { createSalt } = require('./utils/auth')

const tables = [
  'users',
  'goals',
  'posts',
  'tasks'
]

async function main() {
  for (let table of tables){
    const hasTable = await conn.schema.hasTable(table)
    if(hasTable){
      await conn.schema.dropTable(table)
    }
  }
  await conn.schema.createTable(`users`, (table) => {
    table.increments('id')
    table.string('email', 50)
    table.string('password', 150)
    table.string('salt', 20)
  })
  
  await conn.schema.createTable(`goals`, (table) => {
    table.increments('id')
    table.string('title', 30)
    table.string('reason', 30)
  }) 
  process.exit()
}



main()