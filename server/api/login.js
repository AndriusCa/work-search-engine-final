import { randomUUID } from "crypto";
import express from "express";
import { connection } from "../setupDb.js";
import { hash } from "../lib/hash.js"

const login = express.Router()

login.get("/", async (req, res) => {
  const { jobsToken } = req.cookies;

  console.log(jobsToken);

  if (!jobsToken) {
    return res.sendStatus(400)
  }
 

  try {
    const selectQuery = `SELECT * FROM tokens WHERE token=?;`;
    const [selectRes] = await connection.execute(selectQuery, [jobsToken]);
    const [token] = selectRes;

    if (selectRes.length === 1) {
      const cookieExpirationInDays = 1
      const createDate = new Date(token.created)
      const now = new Date()
      const daysDiff = (now - createDate) / 1000 / 86400
      if (daysDiff > cookieExpirationInDays) {
        return res.sendStatus(400)
      }

      return res.sendStatus(200)
    }

    return res.sendStatus(400)
  } catch (error) {
    return res.status(500).json({ msg: "Server error" })
  }
})

login.post("/", async (req, res) => {
  const { email, password } = req.body;

  const minEmailSize = 6
  const minPasswordSize = 6

  const errors = []
  if (typeof email !== "string" || email.length < minEmailSize) {
    errors.push({
      input: "email",
      msg: "Blogas email. Per trumpas.",
    })
  }
  if (typeof password !== "string" || password.length < minPasswordSize) {
    errors.push({
      input: "password",
      msg: "Blogas password. Per trumpas.",
    })
  }

  if (errors.length > 0) {
    return res.status(409).json({
      status: "err-list",
      errors,
    })
  }

  try {
    const selectQuery = `SELECT * FROM users WHERE email = ? AND password_hash = ?;`;
    const [selectRes] = await connection.execute(selectQuery, [email, hash(password)])


    if (selectRes.length !== 1) {
      return res.status(200).json({
        status: "err",
        msg: "Login credentials does not match.",
      });
    }

    const token = randomUUID()
    const insertQuery = `INSERT INTO tokens 
                                (token, user_id)
                            VALUES 
                                (?, ?);`;
    const [insertRes] = await connection.execute(insertQuery, [
      token,
      selectRes[0].id,
    ])

    if (insertRes.affectedRows !== 1) {
      return res.status(500).json({
        status: "err",
        msg: "Server error.",
      });
    }

    return res
      .status(200)
      .set({
        "Set-Cookie": [
          "jobToken=" + token,
          "path=/",
          "domain=localhost",
          "max-age=86400",
          // 'Secure',
          "SameSite=Lax",
          "HttpOnly",
        ].join("; "),
      })
      .json({
        status: "ok",
        msg: "Login success",
      })
  } catch (error) {
    return res.status(500).json({
      status: "err",
      msg: "Server error",
    })
  }
});

export { login }
