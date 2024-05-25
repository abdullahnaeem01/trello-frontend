import React from 'react'
import { Link } from 'react-router-dom'
import validation from '../SignupValidation'
import { useState } from 'react'


const Signup = () => {

        const [values,setValues]=useState({
            fullName:'',
            email:'',
            password:''
        })
        const [errors,setErrors] = useState({})
    
        const handleSubmit=(e)=>{
            e.preventDefault();
            setErrors(validation(values));
            // console.log(values);
            //Calling Api
        }
        const handleInput=(e)=>{
            setValues({
               ...values,
                [e.target.name]:[e.target.value]
            })
            console.log(values);
        }
  return (
    <div className='d-flex justify-content-center align-items-center  bg-dark vh-100'>   
    <div className='bg-white p-3 rounded w-25'>
        <h2 className='text-center text-primary'>Sign-Up</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"> Name</label>
                    <input type="name" placeholder='Enter Name'
                     className="form-control rounded-0"
                     name='fullName'
                     onChange={handleInput} 
                    /> 
                    {errors.name&&<span className="text-danger">{errors.name}</span>}

                </div>
                <div className="mb-3">
                    <label htmlFor="email"> Email</label>
                    <input type="email" placeholder='Enter Email' 
                    className="form-control rounded-0"
                    onChange={handleInput}
                    name='email'
                    /> 
                    {errors.email&&<span className="text-danger">{errors.email}</span>}    
                </div>
                <div className='mb-3'>
                    <label htmlFor="passwordl"> Password</label>
                    <input type="password" placeholder='Enter Password'
                     className="form-control rounded-0"
                     onChange={handleInput}
                     name='password'
                     />
                   {errors.password&&<span className="text-danger">{errors.password}</span>}
                </div>
                <button type="submit" className='btn btn-success w-100 rounded-0'>Sign Up</button>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none  '>Log In</Link>
            </form>
        </div>
    </div>  )
}

export default Signup
