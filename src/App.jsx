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
import Signout from './Components/Signout/Signout';



const App=()=>{

const [user,setUser]=useState("");
console.log(user);

const router=createBrowserRouter([
  {path:'/', 
  element:<Navbar user={user}/>,
  children: [
    {path:'',element:<Home user={user} />},
    {path:'signin', element:<Signin setUser={setUser} />},
    {path:'signup', element:<Signup setUser={setUser} />},
    {path:'mypost',element:<Mypost user={user} />},
    {path:'signout',element:<Signout  setUser={setUser} />},
    {path:'profile',element:<Profile user={user}  />},
  ],
},
// {
//   path:'/home',element:<Home user={user} />,children:[{path:'mypost',element:<Mypost />},{path:'profile',element:<Profile />},{path:'signout',element:<Signout  setUser={setUser} />}]
// },


])

return  (
    <RouterProvider router={router} />
   );

}

export default App;