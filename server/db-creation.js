require('dotenv').config();
const conn = require('./db')
const sha512 = require('js-sha512')
const { createSalt } = require('./utils/auth')

const tables = [
  'users',
  'goals',
  'tasks',
  'posts'
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
    table.date('finish_line_date')
    table.time('finish_line_time')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
  }) 

  await conn.schema.createTable(`tasks`, (table) => {
    table.increments('id')
    table.string('description', 50)
    table.increments('parent_id')
    table.integer('goal_id').unsigned()
    table.foreign('goal_id').references('goals_id')
  })

  await conn.schema.createTable(`posts`, (table) => {
    table.increments('id')
    table.current_timestamp('date_time')
    table.string('description', 144)
    table.integer('goal_id').unsigned()
    table.foreign('goal_id').references('goals_id')
  })

  const salt = createSalt(20)
  await conn('users').insert({email: `?`, password: sha512(`?` + salt), salt: salt})
  await conn('goals').insert({title: `?`, reason:`?`, finish_line: `?`, user_id: `?`})
  await conn('tasks').insert({ description: `?`, parent_id: `?`, goal_id: `?`})
  await conn('posts').insert({date_time: `?`, description: `?`, goal_id: `?`})

  process.exit()

}

main()