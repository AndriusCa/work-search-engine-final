import { Link, useNavigate } from "react-router-dom";
import style from "./Auth.module.css";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState("")
  const [fullnameErr, setFullnameErr] = useState("")
  const [fullnameValid, setFullnameValid] = useState(false)
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [emailValid, setEmailValid] = useState(false)
  const [pass, setPass] = useState("")
  const [passErr, setPassErr] = useState("")
  const [passValid, setPassValid] = useState(false)
  const [repass, setRepass] = useState("")
  const [repassErr, setRepassErr] = useState("")
  const [repassValid, setRepassValid] = useState(false)

  function updateFullname(e) {
    setFullname(e.target.value)
  }

  function updateEmail(e) {
    setEmail(e.target.value)
  }

  function updatePass(e) {
    setPass(e.target.value)
  }

  function updateRepass(e) {
    setRepass(e.target.value)
  }

  function isValidFullname() {
    const minFullnameSize = 2

    if (fullname.length < minFullnameSize) {
      setFullnameErr(
        `Fullname too short. Minimum ${minFullnameSize} symbols required.`
      )
      setFullnameValid(false)
    } else {
      setFullnameErr(false)
      setFullnameValid(true)
    }
  }

  function isValidEmail() {
    const minEmailSize = 6

    if (email.length < minEmailSize) {
      setEmailErr(`Email too short. Minimum ${minEmailSize} symbols required.`)
      setEmailValid(false)
    } else {
      setEmailErr(false)
      setEmailValid(true)
    }
  }

  function isValidPassword() {
    const minPassSize = 6

    if (pass.length < minPassSize) {
      setPassErr(`Password too short. Minimum ${minPassSize} symbols required.`)
      setPassValid(false)
    } else {
      setPassErr(false)
      setPassValid(true)
    }
  }

  function isValidRepeatPassword() {
    if (pass !== repass) {
      setRepassErr("Passwords do not match.")
      setRepassValid(false)
    } else {
      setRepassErr(false)
      setRepassValid(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (fullnameValid && emailValid && passValid && repassValid) {
      fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "err-list") {
            for (const item of data.errors) {
              if (item.input === "fullname") {
                setFullnameErr(item.msg)
              }
              if (item.input === "email") {
                setEmailErr(item.msg)
              }
              if (item.input === "password") {
                setPassErr(item.msg)
              }
            }
          }
          if (data.status === "ok") {
            return navigate("/login")
          }
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className={`form-signin w-100 m-auto ${style.formSignin}`}>
      <form onSubmit={handleSubmit}>
        <h1 className="h1 mb-3 fw-normal">Please register</h1>

        <div className="form-floating mb-3">
          <input
            onChange={updateFullname}
            onBlur={isValidFullname}
            type="text"
            id="fullname"
            className={`form-control ${fullnameErr ? "is-invalid" : ""} ${fullnameValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="fullname">Username</label>
          <div className="invalid-feedback">{fullnameErr}</div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={updateEmail}
            onBlur={isValidEmail}
            type="email"
            id="email"
            className={`form-control ${emailErr ? "is-invalid" : ""} ${emailValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="email">Email address</label>
          <div className="invalid-feedback">{emailErr}</div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={updatePass}
            onBlur={isValidPassword}
            type="password"
            id="password"
            className={`form-control ${passErr ? "is-invalid" : ""} ${passValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="password">Password</label>
          <div className="invalid-feedback">{passErr}</div>
        </div>
        <div className="form-floating">
          <input
            onChange={updateRepass}
            onBlur={isValidRepeatPassword}
            type="password"
            id="repass"
            className={`form-control ${repassErr ? "is-invalid" : ""} ${repassValid ? "is-valid" : ""
              }`}
          />
          <label htmlFor="repass">Repeat password</label>
          <div className="invalid-feedback">{repassErr}</div>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Agree to <Link to="/">Terms of Service</Link>
          </label>
        </div>
        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={!fullnameValid || !emailValid || !passValid || !repassValid}
        >
          Registruotis
        </button>
        <p className="my-3 text-center text-body-secondary">or</p>
        <Link to="/login" className="btn btn-outline-primary w-100 py-2">
          Prisijungti
        </Link>
      </form>
    </div>
  );
}
