import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axios from 'axios';
import UseAuth from '../../hooks/UseAuth';
const Register = () => {
    const {createUser,user,updateuserProfile} = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state || '/'
    const handleSubmit = e =>{
        e.preventDefault()
        const form = e.target 
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const photo = form.photo.value
        if (name === '' || email === '' || password === '' || photo === '') {
           return toast("NO field can be empty")
        }
        if(!/[A-Z]/.test(password)){
            return toast("Password should have a uppercase letter")
          }
          if(!/[a-z]/.test(password)){
            return toast("Password should have a lowercase letter")
          }
          if(password.length <6){
            return toast("Password have to be 6 character")
          }
        const re = {name,email,password,photo}
        createUser(email,password)
        .then(()=>{
          const response1 = axios.post(`${import.meta.env.VITE_API_URL}/user`, re);
              console.log(response1.data);
            updateuserProfile(name,photo).then(()=>{
              Swal.fire({
                title: "Success!",
                text: "User created Successfully!",
                icon: "success"
              });
              navigate(from);
              
            })
          
          })
        .catch(error=>{
            toast(error.message)
        })
        console.log(user)
        
    }
    return (
        <div className='max-w-[1440px] mx-auto'>
           <h2 className=' text-4xl font-bold text-center mt-20'>Register</h2>
           <div className='mx-auto w-1/2 mt-10'>
           <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Enter name" name='name' className="mt-5 input input-bordered w-full" />
           <input type="email" placeholder="Enter email" name='email' className="mt-5 input input-bordered w-full" />
           <input type="password" placeholder="Enter password" name ='password' className="mt-5 input input-bordered w-full" />
           <input type="text" placeholder="Enter photoUrl" name ='photo' className="mt-5 input input-bordered w-full" />
           <p>Already have an account?<Link to='/login' className='text-blue underline text-blue-700'>Login</Link></p>
           <input type="Submit" defaultValue='Register' placeholder="Type here" className="cursor-pointer bg-secondary text-white font-lexend font-bold mt-5 input w-full" />
           </form>
           </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
