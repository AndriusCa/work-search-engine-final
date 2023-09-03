import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { JobTypesTable } from "../../components/job-types-table/JobTypesTable";
import { Title } from "../Title";

export function AdminJobsTypes() {

  const { role } = useContext(GlobalContext);

    if (role !== "admin") {
      return <Forbiden />;
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Job types" uri="/job-types/new" />
        </div>
        <div className="col-12"><JobTypesTable /></div>
      </div>
    </div>
  )
}