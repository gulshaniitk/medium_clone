import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Mypost from './Components/Mypost/Mypost';
import Similarpost from './Components/Home/Similarpost';
import Profile from './Components/Profile/Profile';
import Signout from './Components/Signout/Signout';
import Post from './Components/Home/Post';
import Home from './Components/Home/Home';
import Author from './Components/Author/Author';
import Pay from './Components/Home/Pay';
import Topiclist from './Components/Home/Topiclist';
import Mylibrary from './Components/Mypost/Mylibrary';



const App=()=>{


const [authorization,setAuthorization]=useState(localStorage.authorization==undefined?"":localStorage.authorization);


const router=createBrowserRouter([
  {path:'/', 
  element:<Navbar authorization={authorization} setAuthorization={setAuthorization} />,
  children: [
    
    {path:'/',element:<Home  authorization={authorization} setAuthorization={setAuthorization}  />},
    {path:'/post/:id',element:<Post  authorization={authorization} setAuthorization={setAuthorization}  />},
    {path:'/signin', element:<Signin  authorization={authorization} setAuthorization={setAuthorization} />},
    {path:'/signup', element:<Signup  authorization={authorization} setAuthorization={setAuthorization}/>},
    {path:'/mypost',element:<Mypost  authorization={authorization} setAuthorization={setAuthorization}  />},
    {path:'/signout',element:<Signout   authorization={authorization} setAuthorization={setAuthorization} />},
    {path:'/profile',element:<Profile   authorization={authorization} setAuthorization={setAuthorization}  />},
    {path:'/author/:username', element:<Author  authorization={authorization} setAuthorization={setAuthorization} />},
    {path:'/Similarpost/:author',element:<Similarpost  authorization={authorization} setAuthorization={setAuthorization} />},
    {path:'/Pay',element:<Pay  authorization={authorization} setAuthorization={setAuthorization} />},
    {path:'/Topiclist',element:<Topiclist  authorization={authorization} setAuthorization={setAuthorization} />},
    {path:'/mylibrary',element:<Mylibrary  authorization={authorization} setAuthorization={setAuthorization} />}
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