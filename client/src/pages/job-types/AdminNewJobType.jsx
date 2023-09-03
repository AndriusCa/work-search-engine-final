import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../Title";
import { useNavigate } from "react-router-dom";

export function AdminNewJobType() {
  const navigate = useNavigate();
  const { role, addJobType } = useContext(GlobalContext);
  const [ text, setText ] = useState("");

  if (role !== "admin") {
    return <Forbiden />
  }

  function submitHandler(e) {
    e.preventDefault();

    if (!text) {
      return;
    }

    fetch("http://localhost:3001/api/job-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          addJobType(text)
          navigate("/job-types");
        }
      })
      .catch(console.error)
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="New job type" />
        </div>
        <div>
        <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="mb-3">
                <label className="form-label" htmlFor="jobType">Job type</label>
                <input onChange={e => setText(e.target.value)} value={text} type="text" className="form-control" id="jobType" />
            </div>
            <button className="btn btn-primary py-2" type="submit">Create</button>
        </form>
        </div>
      </div>
    </div>
  )
}
