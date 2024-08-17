import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Login/Login";
import Main from "../Components/Main";
import Home from "../Components/Home/Home";
import Register from "../Components/Register/Register";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
           path:'/',
           element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      
    ]
    },
  ]);
  
export default router;