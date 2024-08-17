import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Route.jsx'
import Firebase_Provider from './Firebase/Firebase-provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Firebase_Provider>
    <div className='mx-auto'>
   <RouterProvider router={router} />
   </div>
   </Firebase_Provider>
  </React.StrictMode>,
)
