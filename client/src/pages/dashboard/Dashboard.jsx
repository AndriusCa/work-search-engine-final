import { useContext } from "react";
import { AdminDashboard } from "./AdminDashboard.jsx";
import { EmployerDashboard } from "./EmployerDashboard";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
// import { JobSeekerDashboard } from "./JobSeekerDashboard";

export function Dashboard() {
  const { role } = useContext(GlobalContext);

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  if (role === "employer") {
    return <EmployerDashboard />
  }

  return <Forbiden/>;
}
