import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../variable';
import { useDispatch } from 'react-redux';
import { Log } from '../../redux/Auth/auth.action';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    axios.post(`${baseURL}login`, { email, password })
      .then(response => {
        // Handle success
        console.log(response.data);
        setError(''); // Clear any previous error
        onLogin();
        toast.success('Logged in successfully!');
        dispatch(Log());
        setTimeout(() => {
          navigate('/admin/home'); // Navigate to /admin-dashboard after toast is shown
        }, 2000); // Delay navigation to let the toast be visible
      })
      .catch(error => {
        // Handle error
        console.error(error);
        setError('Invalid credentials'); // Set error message
        toast.error('Invalid credentials');
      });
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="#" className="h1"><b>Dynamic</b>Website</a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Enter your credentials</p>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              {/* <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a> */}
            </div>
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="register.html" className="text-center">Register a new membership</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
