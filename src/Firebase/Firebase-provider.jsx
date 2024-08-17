import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import axios from 'axios';
import app from './firebase-config';
export const AuthContext = createContext(null)
const Firebase_Provider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()
    console.log(user)
    const auth = getAuth(app)
    const createUser = (email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }
    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
        const userEmail = currentuser?.email || user.email
        setUser(currentuser)
        setLoading(false)
            if (currentuser) {
              const loggedUser = {email : userEmail}
              axios.post(`${import.meta.env.VITE_API_URL}/jwt`,loggedUser,{
                withCredentials : true})
                .then(res => {
                    console.log('token response given',res)
                })      
            } 
          });
          return ()=>{
            unSubscribe();
          }
    },[])
    const loginUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin =()=>{
        setLoading(true)
        
        return signInWithPopup(auth, googleProvider)
    }
    const updateuserProfile = (name,imageurl)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: imageurl
          });
    }
    const githubLogin =()=>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }
    const logout = async ()=>{
        setUser(null)
        const {data} = await axios(`${import.meta.env.VITE_API_URL}/logout`,{
          withCredentials:true
        })
        console.log(data)
        return signOut(auth)
    }
      const allvalues = {
        createUser,
        loading,
        loginUser,
        googleLogin,
        githubLogin,
        logout,
        updateuserProfile,
        user
      }
    return (
        <AuthContext.Provider value = {allvalues}>
              {children}
        </AuthContext.Provider>
    );
};


export default Firebase_Provider;