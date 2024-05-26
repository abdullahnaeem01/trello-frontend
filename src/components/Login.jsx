import React, { useContext, useState } from 'react';
// import '../assets/css/account.css';
// import { AuthContext } from '../context/auth';
import { useAuth } from '../context/auth';

const Login = () => {
  const auth = useAuth();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(userData);
  };

  return (
    <div className="container mt-5 dark-theme">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Welcome to Trello Board</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="InputEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="InputEmail"
                    name="email"
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="InputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p>
                    Don't have an account? <a href="/signup">Create an account</a>
                  </p>
                </div>
                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
