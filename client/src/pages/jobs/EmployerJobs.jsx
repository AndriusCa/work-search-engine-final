import { JobsTable } from "../../components/jobs-table/JobsTable";
import { Title } from "../Title";

export function EmployerJobs() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="My Jobs listed" uri="/jobs/new" />
        </div>
        <div className="col-12">
          <JobsTable />
        </div>
      </div>
    </div>
  )
}
