import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-slate-900 mt-10'>
            <div className=' py-20 flex md:flex-row flex-col justify-around items-center'>
           <div className='text-center '>
           <Link to='/' className='text-yellow-400 text-xl md:text-2xl  font-bold'><span className='text-red-600 font-lexend'>Dummy Project</span></Link>
           <p className='text-center font-lexend text-white font-bold'>Email: bottle@glass.com</p>
           <p className='text-center font-lexend text-white font-bold'>phone: 01151210101</p>
           <p className='text-center font-lexend text-white font-bold'>112/3, Dexter street, port city, Singapore</p>
           </div>
           <div>
                <p className='text-xl font-lexend font-bold w-[300px] text-center text-white'>Indulge in Flavorful Creations, Delight Delivered to Your Doorstep!</p>
                <div className='flex justify-center text-white font-bold mt-3 text-xl gap-4'>
            <FaFacebook />
            <FaInstagram></FaInstagram>
            <FaTwitter></FaTwitter>
            <FaLinkedin></FaLinkedin>
            </div>
           </div>
        </div>
         <p className='text-center text-white mt-3 pb-3 text-[12px] md:text-xl font-bold'>2024@TastyMunchMarketplace. All rights reserved</p>
        </div>
    );
};

export default Footer;