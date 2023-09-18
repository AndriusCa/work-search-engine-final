import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function JobsTable({ filterJobType, filterTitle }) {
  const { jobs, updateJobs } = useContext(GlobalContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/jobs/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          updateJobs(data.list);
        }
      })
      .catch(console.error);
  }, []);

  const imageStyle = {
    width: 100,
    height: 50,
    objectFit: "container",
    objectPosition:"center",
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Location</th>
            <th scope="col">Type</th>
            <th className="text-end" scope="col">
              Veiksmas
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs
            .filter(job =>
              filterJobType === "Visi" ? true : job.jobType === filterJobType
          )
            .filter(job => filterTitle === "" ? true : job.title.toLowerCase().includes(filterTitle))
            .map((job, index) => (
              <tr key={job.title + index}>
                <td>{index + 1}</td>
                <td>
                  <img style={imageStyle} src={job.image} alt="Job" />
                </td>
                <td>{job.title}</td>
                <td>{job.price}</td>
                <td>{job.location}</td>
                <th>{job.jobType}</th>
                <td>
                  <div className="d-flex gap-2 justify-content-end">
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/jobs/${job.title}/edit`}
                    >
                      Edit
                    </Link>
                    {/* <button
                          onClick={() => deleteJobHandler(job)}
                          className="btn btn-danger btn-sm"
                          type="button"
                        >
                          Delete
                        </button> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
