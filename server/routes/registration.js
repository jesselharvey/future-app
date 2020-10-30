const express = require('express')
const router = express.Router()
const conn = require('../db')

router.post("/registration", async (req, res) => {
  const { email, password } = req.body
  const salt = createSalt(20)
  const hashedPassword = sha512(password + salt)
  const checkIfUserExistsSql = `SELECT * FROM users WHERE email = ?;`
  const hasAUser = await conn.raw(checkIfUserExistsSql, [email])
  const userExists = hasAUser.rows.length
  if (userExists) {
    res.status(400).json({ message: "email already exists" })
  } else {
    const addUserSql = `
                INSERT INTO users (email, password, salt)
                VALUES (?, ?, ?);
            `
    const insertedUser = await conn.raw(addUserSql, [
      email,
      hashedPassword,
      salt,
    ])
    res.status(201).json({ message: "user successfully created" })
  }
})

module.exports = router