import express from "express";
import { connection } from "../setupDb.js";

export const jobs = express.Router();

jobs.post("/", async (req, res) => {
  const { role, id } = req.user;

  if (role !== "employer") {
    return res.status(400).json({
      status: "err",
      msg: "You`re are not a employer.",
    });
  }
   


  const { image, title, price, color, jobType, year, steeringWheel, location } =
    req.body;

  if (!title) {
    return res.status(400).json({
      status: "err",
      msg: "Job type could not be created. Provide title value.",
    });
  }

  if (!image) {
    return res.status(400).json({
      status: "err",
      msg: "Job type could not be created. Provide image value.",
    });
  }

  if (!price) {
    return res.status(400).json({
      status: "err",
      msg: "Job could not be created. Provide price value.",
    });
  }

  if (!color) {
    return res.status(400).json({
      status: "err",
      msg: "Job could not be created. Provide color value.",
    });
  }

  if (!jobType) {
    return res.status(400).json({
      status: "err",
      msg: "Job could not be created. Provide job tyope value.",
    });
  }

  if (!year) {
    return res.status(400).json({
      status: "err",
      msg: "Job could not be created. Provide title value.",
    });
  }

  if (!steeringWheel) {
    return res.status(400).json({
      status: "err",
      msg: "Job could not be created. Provide steering wheel value.",
    });
  }

  if (!location) {
    return res.status(400).json({
      status: "err",
      msg: "Job could not be created. Provide locatiobn value.",
    });
  }

  try {

    const jobTypeQuery = `SELECT id FROM \`job-types\` WHERE title = ?;`
    const jobTypeRes = await connection.execute(jobTypeQuery, [jobType]);
    const jobTypeResArray = jobTypeRes[0];

    if (jobTypeResArray.length < 1) {
      return res.status(400).json({
        status: "err",
        msg: "Job type value is invalid.",
      });
    }

    const jobTypeId = jobTypeResArray[0].id;

    const steeringWheelQuery = `SELECT id FROM \`steering-wheel\` WHERE side = ?;`
    const steeringWheelRes = await connection.execute(steeringWheelQuery, [steeringWheel])
    const steeringWheelResArray = steeringWheelRes[0]

    if (steeringWheelResArray.length < 1) {
      return res.status(400).json({
        status: "err",
        msg: "Steering wheel value is invalid.",
      })
    }

    const steeringWheelId = steeringWheelResArray[0].id

    const insertQuery = `INSERT INTO jobs
       (user_id, job_type_id, title, color, price, year, steering_wheel_id, location, mileage, image) VALUES (?,?,?,?,?,?,?,?,?,?)`
    const insertRes = await connection.execute(insertQuery, [
      id,
      jobTypeId,
      title,
      color,
      price,
      year,
      steeringWheelId,
      location,
      0,
      image
    ])
    const insertResObject = insertRes[0];

    if (insertResObject.insertId > 0) {
      return res.status(201).json({
        status: "ok",
        msg: "Job created",
      });
    } else {
      return res.status(400).json({
        status: "err",
        msg: "Job type could not bet created.",
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

jobs.get("/", async (req, res) => {

  const role = req.user.role;
  let selectQuery = "";

  if (role === "admin") {
    selectQuery = `SELECT jobs.id, jobs.title, \`job-types\`.title as jobType, jobs.image, jobs.price, jobs.color, jobs.location
                    FROM jobs
                    INNER JOIN \`job-types\` ON \`job-types\`.id = jobs.job_type_id;`
  } if (role === "employer") {
    selectQuery = `SELECT * FROM jobs WHERE user_id =?;`
  } else  { 
     return res.status(403).json({
      status: "err",
      msg: "Fordbiden",
    });
  } 
 
  try {
    const selectRes = await connection.execute(selectQuery, [req.user.id])
    const jobs = selectRes[0];

    return res.status(200).json({
      status: "ok",
      list: jobs,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "GET: JOB TYPES API - server error.",
    });
  } 
});

jobs.get("/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const selectQuery = `SELECT jobs.id, jobs.title, \`job-types\`.title as jobType, jobs.image, jobs.price, jobs.color, jobs.location, \`steering-wheel\`.side as steeringWheel
                            FROM jobs
                            INNER JOIN \`job-types\` ON \`job-types\`.id = jobs.job_type_id
                            INNER JOIN \`steering-wheel\` ON \`steering-wheel\`.id = jobs.steering_wheel_id
                            WHERE jobs.id = ?;`;
    const selectRes = await connection.execute(selectQuery, [jobId]);
    const jobs = selectRes[0];

    return res.status(200).json({
      status: "ok",
      job: jobs[0],
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "GET: JOB TYPES API - server error.",
    })
  }
})


// jobs.delete("/:title", async (req, res) => {
//   const { title } = req.params;

//   try {
//     const deleteQuery = `DELETE FROM \`job-types\` WHERE title = ?;`
//     const deleteRes = await connection.execute(deleteQuery, [title])
//     const jobs = deleteRes[0]

//     if (jobs.affectedRows > 0) {
//       return res.status(200).json({
//         status: "ok",
//         msg: "Job type deleted.",
//       })
//     } else {
//       return res.status(400).json({
//         status: "err",
//         msg: "There was nothing to delete.",
//       })
//     }
//   } catch (error) {
//     return res.status(500).json({
//       status: "err",
//       msg: "DELETE: TOB TYPES API - server error.",
//     })
//   }
// });

// jobs.put("/:oldTitle", async (req, res) => {
//   const { oldTitle } = req.params;
//   const { newTitle } = req.body;

//   if (!oldTitle || !newTitle) {
//     return res.status(400).json({
//       status: "err",
//       msg: 'Job type could not be created. Provide "title" values.',
//     })
//   }

//   try {
//     const selectQuery = `SELECT * FROM \`job-types\` WHERE title = ?;`
//     const selectRes = await connection.execute(selectQuery, [newTitle])
//     const jobs = selectRes[0]

//     if (jobs.length > 0) {
//       return res.status(200).json({
//         status: "err-list",
//         errors: [
//           {
//             input: "jobs",
//             msg: "Such job type already exists.",
//           },
//         ],
//       })
//     }

//     const updateQuery = `UPDATE \`job-types\` SET title = ? WHERE title = ?`
//     const updateRes = await connection.execute(updateQuery, [
//       newTitle,
//       oldTitle,
//     ])
//     const updateResObject = updateRes[0]

//     if (updateResObject.affectedRows > 0) {
//       return res.status(200).json({
//         status: "ok",
//         msg: "JOB type updated.",
//       })
//     } else {
//       return res.status(400).json({
//         status: "err",
//         msg: "JOB type could not be updated.",
//       })
//     }
//   } catch (error) {
//     return res.status(500).json({
//       status: "err",
//       msg: "PUT: JOB TYPES API - server error.",
//     })
//   }
// });


  jobs.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "jobs" method' })
  });
