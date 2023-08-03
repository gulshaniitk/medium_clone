import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';

const router=createBrowserRouter([
  {path:'/', element:<Navbar />},
  {path:'/signin', element:<Signin />},
  {path:'/signup', element:<Signup />}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

