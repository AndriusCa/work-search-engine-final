import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            ></Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 link-secondary">
                  Pagrindinis
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 link-body-emphasis">
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 link-body-emphasis">
                  Customers
                </Link>
              </li>
            </ul>
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control"
                placeholder="Paieška..."
                aria-label="Search"
                autoComplete="on"
              />
            </form>
            <div className="dropdown text-end">
              <div className="text-end">
                <Link to="Login" className="btn btn-primary me-2">
                  Prisijungti
                </Link>
                <Link to="Register" className="btn btn-primary">
                  Registruotis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
