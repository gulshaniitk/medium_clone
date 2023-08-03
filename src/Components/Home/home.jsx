import { Link,Outlet } from "react-router-dom";

import { useEffect } from "react";

const Home = (props) => {

    // useEffect(()=>{
    //     fetch('http://127.0.0.1:3003').then((response)=>{
    //     return response.json();
    //     }).then((data)=>{
    //         console.log(data);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // },[])

  return (
    <div>
    <div>
       
      <h2>Welcome {props.user}</h2>
      <div>

      </div>
      
    </div>
    <div>
    {/* <Outlet /> */}
    <h1>Home Page</h1>
    </div>
    </div>
  );
};

export default Home;
