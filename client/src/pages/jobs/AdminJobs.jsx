import { JobsTable } from "../../components/jobs-table/JobsTable";
import { Title } from "../Title";

export function AdminJobs() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Jobs listed" />
        </div>
        <div className="col-12">
          <JobsTable />
        </div>
      </div>
    </div>
  )
}
