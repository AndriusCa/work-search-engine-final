import express from "express";
import { connection } from "../setupDb.js";

export const logout = express.Router()

logout.get("/", async (req, res) => {
  const { jobsToken } = req.cookies;

  if (!jobsToken) {
    return res.status(200).json({
      status: "ok",
      msg: "You are already log out.",
    });
  }

  try {
    const selectQuery = `DELETE FROM tokens WHERE token = ?;`;
    const selectRes = await connection.execute(selectQuery, [jobsToken]);

    const cookie = [
      "jobsToken=" + jobsToken,
      "path=/",
      "domain=localhost",
      "max-age=-1",
      // 'Secure',
      "SameSite=Lax",
      "HttpOnly",
    ]
    return res.status(200).set("Set-Cookie", cookie.join("; ")).json({
      status: "ok",
      msg: "Session deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "err",
      msg: "POST: LOGIN API - server error.",
    });
  }
});

logout.use((req, res, next) => {
  return res.status(404).json({ msg: 'Unsupported "Logout" method' })
});
