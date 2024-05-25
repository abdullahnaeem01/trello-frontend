import React from "react";
import { Link } from "react-router-dom";
import validation from "../LoginValidation";

import { useState } from "react";

const Login = () => {
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    const [errors,setErrors] = useState({})

    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrors(validation(values));
        // console.log(values);
    }
    const handleInput=(e)=>{
        setValues({
           ...values,
            [e.target.name]:[e.target.value]
        })
        console.log(values);
    }
   
  return (
    <div className="d-flex justify-content-center align-items-center  bg-dark vh-100 ">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="text-center text-primary">Log-In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
              onChange={handleInput}
            />
            {errors.email&&<span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="passwordl"> Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              name="password"
              onChange={handleInput}
            />
            {errors.password&&<span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Log In</button>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none  "
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
