import { useContext } from "react";
import { AdminJobs } from "./AdminJobs.jsx";
import { EmployerJobs } from "./EmployerJobs.jsx";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import { Forbiden } from "../../components/error/Forbiden.jsx";
// import { JobSeekerDashboard } from "./JobSeekerDashboard";

export function Jobs() {
  const { role } = useContext(GlobalContext);

  if (role === 'admin') {
    return <AdminJobs />;
  }

  if (role === "employer") {
    return <EmployerJobs />
  }

  return <Forbiden/>;
}
