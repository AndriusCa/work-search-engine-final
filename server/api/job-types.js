import express from "express";
import { connection } from "../setupDb.js";

export const jobTypes = express.Router();

jobTypes.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "err",
      msg: "Job type could not be created. Provide title value.",
    });
  }

  try {
    const selectQuery = `SELECT * FROM \`job-types\` WHERE title = ?;`
    const selectRes = await connection.execute(selectQuery, [title])
    const jobTypes = selectRes[0]

    if (jobTypes.length > 0) {
      return res.status(200).json({
        status: "err-list",
        errors: [
          {
            input: "jobType",
            msg: "Such job title already exists.",
          },
        ],
      })
    }

    const insertQuery = `INSERT INTO \`job-types\` (title) VALUES (?)`
    const insertRes = await connection.execute(insertQuery, [title]);
    const insertResObject = insertRes[0]

    if (insertResObject.insertId > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "Job type created successfully.",
      });
    } else {
      return res.status(400).json({
        status: "err",
        msg: "Job type could not bet created. Please try again later.",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "POST: JOB TYPES API - server error.",
    })
  }
});

jobTypes.get("/", async (req, res) => {

  try {
    const selectQuery = `SELECT title FROM \`job-types\`;`;
    const selectRes = await connection.execute(selectQuery)
    const jobTypes = selectRes[0];

    return res.status(200).json({
      status: "ok",
      list: jobTypes,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "GET: JOB TYPES API - server error.",
    })
  }
});

jobTypes.delete("/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const deleteQuery = `DELETE FROM \`job-types\` WHERE title = ?;`
    const deleteRes = await connection.execute(deleteQuery, [title])
    const jobTypes = deleteRes[0]

    if (jobTypes.affectedRows > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "Job type deleted.",
      })
    } else {
      return res.status(400).json({
        status: "err",
        msg: "There was nothing to delete.",
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "err",
      msg: "DELETE: TOB TYPES API - server error.",
    })
  }
});

jobTypes.put("/:oldTitle", async (req, res) => {
  const { oldTitle } = req.params;
  const { newTitle } = req.body;

  if (!oldTitle || !newTitle) {
    return res.status(400).json({
      status: "err",
      msg: 'Job type could not be created. Provide "title" values.',
    })
  }

  try {
    const selectQuery = `SELECT * FROM \`job-types\` WHERE title = ?;`
    const selectRes = await connection.execute(selectQuery, [newTitle])
    const jobTypes = selectRes[0]

    if (jobTypes.length > 0) {
      return res.status(200).json({
        status: "err-list",
        errors: [
          {
            input: "jobTypes",
            msg: "Such job type already exists.",
          },
        ],
      })
    }

    const updateQuery = `UPDATE \`job-types\` SET title = ? WHERE title = ?`
    const updateRes = await connection.execute(updateQuery, [
      newTitle,
      oldTitle,
    ])
    const updateResObject = updateRes[0]

    if (updateResObject.affectedRows > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "JOB type updated.",
      })
    } else {
      return res.status(400).json({
        status: "err",
        msg: "JOB type could not be updated.",
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "err",
      msg: "PUT: JOB TYPES API - server error.",
    })
  }
});


  jobTypes.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Job types" method' })
  });
