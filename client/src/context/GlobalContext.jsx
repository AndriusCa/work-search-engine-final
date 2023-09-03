import { createContext, useEffect, useState } from "react";

export const initialContext = {
  loginStatus: false,
  updateLoginStatus: () => {},
  role: "public",
  updateRole: () => {},
  fullname: "",
  updateFullname: () => {},
  email: "",
  updateEmail: () => {},
  jobTypes: "",
  addJobType: () => {},
  deleteJobType: () => { },
  editJobType: () => { },
  updateJobTypes: () => {},
}

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {

  const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
  const [role, setRole] = useState(initialContext.role);
  const [fullname, setFullname] = useState(initialContext.fullname);
  const [email, setEmail] = useState(initialContext.email);
  const [jobTypes, setJobTypes] = useState(initialContext.jobTypes);

  // user busena: role, email,...
  useEffect(() => {
    fetch("http://localhost:3001/api/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.user) {
          setLoginStatus(true);
          setRole(data.user.role);
          setFullname(data.user.fullname);
          setEmail(data.user.email);
        }
      })
      .catch(console.error);

  }, []);


  // Pradinis darbu tipu masyvas
  useEffect(() => {
    fetch("http://localhost:3001/api/job-types", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.list) {
          setJobTypes(data.list.map(t => t.title));
        }
      })
      .catch(console.error);
  }, []);
  

  function updateLoginStatus(status) {
    setLoginStatus(status);
  }

  function updateRole(role) {
    const allowedRoles = ["public", "admin", "employer"]
    if (allowedRoles.includes(role)) {
      setRole(role);
    }
  }

  function updateFullname(fullname) {
    setFullname(fullname);
  }

  function updateEmail(email) {
    setEmail(email);
  }

  function updateJobTypes(jobTypes) {
    setJobTypes(jobTypes);
  }

  function addJobType(jobType) {
    setJobTypes(pre => [...pre, jobType]);
  }

   function deleteJobType(jobType) {
     setJobTypes(pre => pre.filter(title => title !== jobType));
  }
  
  function editJobType(oldJobType, newJobType) {
    setJobTypes(pre => pre.map(title => title === oldJobType ? newJobType : title));
  }

  const value = {
    loginStatus,
    updateLoginStatus,
    role,
    updateRole,
    fullname,
    updateFullname,
    email,
    updateEmail,
    jobTypes,
    addJobType,
    deleteJobType,
    editJobType,
    updateJobTypes
  }

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
