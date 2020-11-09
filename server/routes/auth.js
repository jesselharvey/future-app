const express = require('express')
const router = express.Router()
const conn = require('../db')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')

// could also use a library this is just an example
function createSalt(len = 20) {
  const vals = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let str = ''
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * vals.length)
    str += vals.charAt(randomIndex)
  }
  return str
}

router.post('/registration', async (req, res) => {
  const { name, email, password } = req.body
  const salt = createSalt(20)
  const hashedPassword = sha512(password + salt)
  const checkIfUserExistsSql = `SELECT * FROM users WHERE email = ?;`
  const hasAUser = await conn.raw(checkIfUserExistsSql, [email])
  const userExists = hasAUser.rows.length
  if (userExists) {
    res.status(400).json({ message: 'email already exists' })
  } else {
    const addUserSql = `
                INSERT INTO users (name, email, password, salt)
                VALUES (?, ?, ?, ?);
            `
    const insertedUser = await conn.raw(addUserSql, [
      name,
      email,
      hashedPassword,
      salt,
    ])
    res.status(201).json({ message: 'user successfully created' })
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  const checkIfUserExistsSql = `SELECT * FROM users WHERE email = ?;`
  const hasAUser = await conn.raw(checkIfUserExistsSql, [email])
  const userExists = hasAUser.rows.length
  if (!userExists) {
    res.status(400).json({ message: 'invalid email or password' })
  } else {
    const user = hasAUser.rows[0]
    const hashedPassword = sha512(password + user.salt)
    if (hashedPassword === user.password) {
      // generate a token based on server secret for client to use to authenticate
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET
      )
      res.status(200).json({ token: token })
    } else {
      res.status(400).json({ message: 'invalid email or password' })
    }
  }
})

module.exports = router