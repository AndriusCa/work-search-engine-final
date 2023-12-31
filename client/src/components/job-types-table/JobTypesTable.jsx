import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function JobTypesTable() {
  const { jobTypes, deleteJobType } = useContext(GlobalContext);

  /*
GET: http/api/job-types                                                         ['type1', 'type2', 'type3']
GET: http/api/job-types/pavadinimas                                             {title: type1, size: 5, color: red}
DELETE: http/api/job-types/pavadinimas
POST: http/api/job-types + {title: type1, size: 5, color: red}
PUT:  http/api/job-types/pavadinimas + {title: type1, size: 5, color: red}
*/

  function deleteJobTypeHandler(title) {
    fetch("http://localhost:3001/api/job-types/" + title, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          deleteJobType(title);
        }
      })
      .catch(console.error)
  }

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
          {jobTypes.map((jobType, index) => (
            <tr key={jobType}>
              <td>{index + 1}</td>
              <td>{jobType}</td>
              <td className="d-flex gap-2 justify-content-end">
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/job-types/${jobType}/edit`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteJobTypeHandler(jobType)}
                  className="btn btn-danger btn-sm"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
