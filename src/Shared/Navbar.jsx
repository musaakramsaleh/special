import React, { useContext } from 'react';

import { Link, NavLink, useActionData } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';





const Navbar = () => {
    const {user,logout} = UseAuth()
   const handleSignout =()=>{
    logout()
    .then()
    .catch()
  
} 
    const navItems = ()=>{
        return <>
         <li><NavLink to='/' className={({isActive})=>isActive?'text-yellow-600 font-bold':'text-secondary'}>Home</NavLink></li>
         <li><NavLink to='/gallery' className={({isActive})=>isActive?'text-yellow-600 font-bold':'text-secondary'}>All</NavLink></li>
         </>
        
    }
    return (
        <div>
            <div className="navbar bg-slate-950">
  <div className="navbar-start z-50">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 ">
        {navItems()}
      </ul>
    </div>
    <Link to='/' className='text-yellow-400 text-xl  md:text-2xl ml-0 md:ml-10 font-bold'><span className='text-red-600 font-lexend'>Dummy Project</span></Link>
  </div>
  <div className="navbar-center z-50 hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl font-lexend">
      {navItems()}
    </ul>
  </div>
  <div className="navbar-end">
    {
     user? <div className='flex'>
      <div className='dropdown dropdown-end z-50'>
     <div
       tabIndex={0}
       role='button'
       className='btn btn-ghost btn-circle avatar'
     >
       <div className='w-10 rounded-full' title=''>
         <img
           referrerPolicy='no-referrer'
           alt='User Profile Photo'
           src={user.photoURL}
         />
       </div>
     </div>
     <ul
       tabIndex={0}
       className='menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52'
     >
       <li>
         <NavLink to='/dashboard'><div className='justify-between'>Dashboard</div></NavLink>
       </li>
     </ul>
   </div>
   <button onClick={()=>handleSignout()} className='bg-secondary font-lexend px-5 py-3 rounded-lg font-bold text-white block text-center'>Logout</button>
     </div> :<>
  <Link to='/login'  className='bg-secondary font-lexend px-5 py-3 rounded-lg font-bold text-white block text-center'>Login</Link>
  </>
   
  
  }
  </div>
</div>
        </div>
    );
};

export default Navbar;