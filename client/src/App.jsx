import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from "./layout/PublicLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { List } from "./pages/List";
import { Terms } from "./pages/Terms";
import { UserLayout } from './layout/UserLayout';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { AdminJobsTypes } from './pages/job-types/AdminJobsTypes';
import { AdminNewJobType } from "./pages/job-types/AdminNewJobType";
import { AdminEditJobType } from "./pages/job-types/AdminEditJobType";
import { Users } from "./pages/Users/Users";

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/list" element={<List />}></Route>
            <Route path="/terms" element={<Terms />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/job-types" element={<AdminJobsTypes />}></Route>
            <Route path="/job-types/new" element={<AdminNewJobType />}></Route>
            <Route
              path="/job-types/:jobType/edit"
              element={<AdminEditJobType />}
            ></Route>
            <Route path="/users" element={<Users />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  )
}

export default App;
