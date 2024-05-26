import React, { useContext, useState } from 'react';
import { useAuth } from '../context/auth';

const Signup = () => {
  const auth = useAuth();
  const [userData, setUserData] = useState({
    fullName: '',
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
    auth.register(userData);
  };

  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          <form className='border border-secondary rounded p-3'>
            <div className='form-group'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                type='text'
                className='form-control'
                id='fullName'
                name='fullName'
                placeholder='Enter your full name'
                value={userData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='InputEmail'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='InputEmail'
                name='email'
                placeholder='Enter email'
                value={userData.email}
                onChange={handleChange}
              />
              <small id='emailHelp' className='form-text text-muted'>
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputPassword2'>Password</label>
              <input
                type='password'
                className='form-control'
                id='InputPassword2'
                name='password'
                placeholder='Password'
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <br></br>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <div className='mt-2'>
              <p>
                Already have an account? <a href='/login'>Log in here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
