require('dotenv').config();
const conn = require('./db')
const sha512 = require('js-sha512')
const { createSalt } = require('./utils/auth')

const tables = [
  'posts',
  'tasks',
  'goals',
  'users',
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
    table.enu('status', ['complete', 'active']).defaultTo('active')
    table.date('date')
    table.time('time')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id').onDelete('cascade')
  }) 

  await conn.schema.createTable(`tasks`, (table) => {
    table.increments('id')
    table.string('description', 50)
    table.integer('parent_id').unsigned()
    table.enu('status', ['complete', 'active']).defaultTo('active')
    // table.increments('parent_id').references('tasks.id').onDelete('cascade')
    table.integer('goal_id').unsigned()
    table.foreign('goal_id').references('goals.id').onDelete('cascade')
  })

  await conn.schema.createTable(`posts`, (table) => {
    table.increments('id')
    table.timestamp('date_time')
    table.string('description', 144)
    table.integer('goal_id').unsigned()
    table.foreign('goal_id').references('goals.id').onDelete('cascade')
  })

  const salt = createSalt(20)
  const user = await conn('users').insert({email: `test@example.com`, password: sha512(`?` + salt), salt: salt})
  const goal = await conn('goals').insert({title: `goal 1`, reason:`this is the reason`, date: '2020-10-07', time: '12:00:00', user_id: 1})
  const task = await conn('tasks').insert({ description: `task 1`, parent_id: null, goal_id: 1})
  const subTasks = await conn('tasks').insert({ description: `sub task of 1`, parent_id: 1, goal_id: 1})
  await conn('posts').insert({date_time: new Date(), description: `My first post`, goal_id: 1})

  process.exit()

}

main()