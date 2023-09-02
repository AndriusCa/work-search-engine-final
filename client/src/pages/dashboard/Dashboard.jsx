import { useContext } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { EmployerDashboard } from "./EmployerDashboard";
import { GlobalContext } from "../../context/GlobalContext";

export function Dashboard() {
  const { role } = useContext(GlobalContext);

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  return <EmployerDashboard />;
}
