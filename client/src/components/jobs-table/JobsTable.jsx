import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function JobsTable() {
  const { jobs } = useContext(GlobalContext);

  // function deleteJobTypeHandler(title) {
  //   fetch("http://localhost:3001/api/job-types/" + title, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //     credentials: "include",
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.status === "ok") {
  //         deleteJobType(title);
  //       }
  //     })
  //     .catch(console.error)
  // }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Darbo tipas</th>
            <th className="text-end" scope="col">
              Veiksmas
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.title + index}>
              <td>{index + 1}</td>
              <td>{job.title}</td>
              <td className="d-flex gap-2 justify-content-end">
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/jobs/${job}/edit`}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
