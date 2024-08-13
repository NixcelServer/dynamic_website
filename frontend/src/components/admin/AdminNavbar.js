import React from 'react'
import { baseURL } from '../../variable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/Auth/auth.action';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    axios.get(`${baseURL}logout`)
      .then(response => {
        console.log("Logout successful:", response.data);
        localStorage.setItem('isAuthenticated','false');
        dispatch(Logout); 
        navigate('/');
        window.location.reload();
        // Perform additional actions after successful logout (e.g., clear session, redirect)
      })
      .catch(error => {
        console.error("Logout error:", error);
        // Handle logout error (e.g., show error message)
      });
  };
  return (
    <div>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link">Home</a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      {/* <a href="#" className="nav-link">Contact</a> */}
    </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    {/* <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button">
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li> */}
    {/* Messages Dropdown Menu */}
   
    {/* Notifications Dropdown Menu */}
    {/* <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">15</span>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">15 Notifications</span>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-envelope mr-2" /> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-users mr-2" /> 8 friend requests
          <span className="float-right text-muted text-sm">12 hours</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div>
    </li> */}
    
   
   

    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
      <img src='/AdminLTE/dist/img/user2-160x160.jpg' className="img-circle elevation-2" alt="User Image" 
      style={{ width: '25px', height: '25px', objectFit: 'cover', cursor: 'pointer' }}/>
        {/* <span className="badge badge-warning navbar-badge">15</span> */}
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ minWidth: 'auto' }}>
      {/* <div className="dropdown-item">
            Admin
          </div> */}
        {/* <span className="dropdown-item dropdown-header">15 Notifications</span> */}
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          {/* <i className="fas fa-envelope mr-2" /> 4 new messages */}Settings
          {/* <span className="float-right text-muted text-sm">3 mins</span> */}
        </a>
        <div className="dropdown-divider" />
        <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        {/* <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a> */}
        {/* <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a> */}
      </div>
    </li>



  </ul>
</nav>

    </div>
  )
}

export default AdminNavbar
