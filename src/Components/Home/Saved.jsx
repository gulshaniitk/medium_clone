import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Saved=(props)=>{

    const navigate=useNavigate();
    const [show,setShow]=useState([]);

    useEffect(()=>{
       
        Savedpost();

    },[])

    const Savedpost=()=>{

        if(props.authorization=="")
        {
          navigate("/signin")
        }
        {
    
    
        axios.get('http://127.0.0.1:3003/view_saved',{
          headers:{
            Authorization:localStorage.Authorization
          }}).then((res)=>{
              console.log(res.data.articles);
              if('error' in res.data)
              {
               navigate('/signout')
              }
              setShow([...res.data.articles]);
          }).catch((err)=>{
            console.log(err);
          })
    
      }
      }

    const Saved=(post)=>{
  

        axios.get(`http://127.0.0.1:3003/save/?id=${post.id}`,
        {
          headers:{
            Authorization:localStorage.Authorization
          }
        }
        ).then((res)=>{
          console.log(res);
          if('error' in res.data && res.data.error=="Log in or sign up first")
          {
            navigate('/signout');
          }
          Savedpost();
        }).catch((err)=>{
          console.log(err);
        })
    
      }

    return (
        <div>
            <button onClick={()=>{navigate(-1)}} className="create_new">Back</button>
            <h1 style={{textAlign:"center"}}>Saved Posts</h1>
 <div>
        
        {
          show.map((post,idx)=>{
            return <div className="post" key={post.id} style={{borderBottom:"2px solid black"}}>
                <div className="left">
                <p className="author">{post.author}</p>
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
                <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
                <div className="lower">
                <p className="date">{post.created_at.substr(0,10)}</p>
                <p className="topic">{post.topic}</p>
                <p>Reading Time: {post.reading_time_minute} minutes</p>
                <button onClick={()=>{Saved(post)}}>Remove</button>
                </div>
                </div>
                
                 <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
                
              </div>
          })
        }
        </div>     
        </div>
    )
}

export default Saved;