import { JobsTable } from "../../components/jobs-table/JobsTable";
import { Title } from "../Title";
import { GlobalContext } from "../../context/GlobalContext";
import { useState, useContext} from "react";

export function EmployerJobs() {
  const { jobTypes } = useContext(GlobalContext);
  const [selectedJobType, setSelectedJobType] = useState("Visi");
  const [title, setTitle] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="My Jobs listed" uri="/jobs/new" />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-6 col-sm-4 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                <option value="Visi">Visi</option>
                {jobTypes.map((jt) => (
                  <option key={jt} value={jt}>
                    {jt}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <JobsTable
            filterJobType={selectedJobType}
            filterTitle={title.toLowerCase()}
          />
        </div>
      </div>
    </div>
  )
}
