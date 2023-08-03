import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/home';
import Mypost from './Components/Mypost/Mypost';
import Newpost from './Components/Mypost/Newpost';
import Profile from './Components/Profile/Profile';
import App from './App';


// const router=createBrowserRouter([
//   {path:'/', 
//   element:<Navbar />,
//   children: [
//     {path:'signin', element:<Signin />},
//     {path:'signup', element:<Signup />},
//   ],
// },
// {
//   path:'/home',element:<Home />,children:[{path:'mypost',element:<Mypost />},{path:'profile',element:<Profile />}]
// },


// ])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    
    <App/>
  </React.StrictMode>
);

