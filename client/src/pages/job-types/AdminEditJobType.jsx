import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../Title";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export function AdminEditJobType() {
  const { jobType } = useParams();
  const navigate = useNavigate();
  const { role, editJobType } = useContext(GlobalContext);
  const [ text, setText ] = useState(jobType);

  if (role !== "admin") {
    return <Forbiden />
  }

  function submitHandler(e) {
    e.preventDefault();

    if (!text) {
      return;
    }

    fetch("http://localhost:3001/api/job-types/" + jobType, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ newTitle: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          editJobType(jobType, text)
          navigate("/job-types");
        }
      })
      .catch(console.error)
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Edit job type" />
        </div>
        <div>
          <form
            onSubmit={submitHandler}
            className="col-12 col-sm-8 col-md-6 col-lg-4"
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="jobType">
                Job type
              </label>
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                className="form-control"
                id="jobType"
              />
            </div>
            <button className="btn btn-primary py-2" type="submit">
              Update
            </button>
            <Link to="/job-types" className="btn btn btn-outline-secondary py-2" type="submit">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
