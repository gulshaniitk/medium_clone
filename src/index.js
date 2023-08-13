import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
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
root.render(<App/>
  // <React.StrictMode>
  //   <App/>
  // </React.StrictMode>
);

