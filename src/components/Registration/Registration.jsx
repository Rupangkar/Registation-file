import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';


const Registration = () => {
    const auth = getAuth(app);
    const [success,setSuccess]= useState(false)
    const [error,setError]= useState(null)


    const handleRegistration = ( event ) => {
        event.preventDefault()
        const form = event.target;
        const name = form.fullName.value
        const email = form.email.value
        const password = form.password.value
        createUserWithEmailAndPassword(auth,email,password)
        
        .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true)
            setError(null)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
            setSuccess(false)
            
          });
        
        
    }
    return (
        <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Registration <span className='text-red-500'>now</span>!</h1>
          </div>
          <div className="card shrink-0 w-96  shadow-2xl  bg-base-100">

            <form onSubmit={handleRegistration} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-nor font-semibold">Full Name</span>
                </label>
                <input type="Full Name" placeholder="Full Name" name='fullName' className="input input-bordered" required />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-nor font-semibold">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                <label className="label">
                  <Link to='/login' className="label-text-alt link link-hover font-semibold">Already Have an account? Please Login</Link>
                </label>
              </div>
              {
                success && <p className='text-green-500'>Successfully Registration Dan</p>
              }

{
                <p className='text-red-500'>{error}</p>
              }
              <div className="form-control mt-6">
                <button type='Submit' className="btn btn-primary">Registration</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
};

export default Registration;