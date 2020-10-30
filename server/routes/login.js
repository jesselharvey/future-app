const express = require('express')
const router = express.Router()
const conn = require('../db')

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  const checkIfUserExistsSql = `SELECT * FROM users WHERE email = ?;`
  const hasAUser = await conn.raw(checkIfUserExistsSql, [email])
  const userExists = hasAUser.rows.length
  if (!userExists) {
    res.status(400).json({ message: "invalid email or password" })
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
      res.status(400).json({ message: "invalid email or password" })
    }
  }
})

module.exports = router