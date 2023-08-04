import { Link,Outlet, json } from "react-router-dom";

import { useEffect, useState } from "react";
import './Home.css'


const Home = (props) => {

  const [data,setData]=useState([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:3003').then((response)=>{
        return response.json();
        }).then((data)=>{
          console.log(data);
            setData(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

   

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        
        {
          data.map((post,idx)=>{
            return <div className="post">
                <div className="left">
                <p className="author">{post.author.name}</p>
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
                <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
                <div className="lower">
                <p className="date">{post.created_at.substr(0,10)}</p>
                <p className="topic">{post.topic.name}</p>
                </div>
                </div>
                
                 <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
                
              </div>
          })
        }
        </div>     
    </div>
  );
};

export default Home;
