import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear('token');
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={'nav-link ${location.pathname === "/" ? "active" : ""}'} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={'nav-link ${location.pathname === "/about" ? "active" : ""}'} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
              <Link className="btn btn-primary mx-2" role="button" to="signup">Signup</Link>
            </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}