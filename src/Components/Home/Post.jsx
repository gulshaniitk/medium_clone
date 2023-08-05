import { useEffect, useState } from "react";
import './Post.css'
import { useParams,useNavigate } from "react-router-dom";

const Post=(props)=>{

    const [data,setData]=useState([]);
    const {id}=useParams();
    const [temp,setTemp]=useState([1]);
    const navigate=useNavigate();
    console.log(id);

    useEffect(()=>{

        if(props.authorization=="")
        {
            navigate('/signin');
        }
        else {
        fetch(`http://127.0.0.1:3003/details/?id=${id}`,{headers:{'Authorization':localStorage.Authorization}}).then((res)=>{
                    return res.json();
                    }).then((res)=>{
                       console.log(res);
                    setData([res]);
                      
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
    }
    
},[temp])

const onLike=()=>{
    const ele=document.getElementById('like');
    fetch(`http://127.0.0.1:3003/like/?id=${data[0].id}`,{
        method: "POST",
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization':localStorage.Authorization
            }
    }).then((res)=>{
                return res.json();
                }).then((res)=>{
                   console.log(res);
                   setTemp([...temp])
                  
                })
                .catch((error)=>{
                    console.log(error);
                })
 if(ele.style.backgroundColor == "red")
 {
    ele.style.backgroundColor = "white";
    ele.style.color = "black";



 }
 else { ele.style.backgroundColor = "red";
 ele.style.color = "white";

 

}

}

const Follow=()=>{
    const ele=document.getElementById("follow");

    

    if(ele.innerHTML=="Follow")
    {   
        
        fetch(`http://127.0.0.1:3003/follow/?username=${data[0].author}`,{
            method: "POST",
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                'Authorization':localStorage.Authorization
                }
        }).then((res)=>{
                    return res.json();
                    }).then((res)=>{
                       console.log(res);
                    setTemp([...temp])
                      
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
       
            ele.innerHTML="Following"
    }
    else
    {
        ele.innerHTML="Follow"
    }
}


    return (
        <div>
           <button onClick={()=>navigate(-1)} id="back">Back</button>
           {
             data.map((post,idx)=>{
                return <div><div className="post_byid">
                <h1 className="p_title">{post.title}</h1>
               <p className="p_author">{post.author}<button className="follow" id="follow" onClick={()=>{Follow()}}>Follow</button></p>
                <img src={post.image_url} width={680} height={380} ></img>
                <p className="p_text">{post.text}</p>
                <p className="topic">{post.topic}</p>
                </div>
                <div className="like_view">
                <button id="like" onClick={()=>{onLike()}} className="like">Likes</button>
                <span className="show_count">{post.likes.length}</span>
                <button id="comment">Comments</button>
                <span className="show_count">{post.comments.length}</span>
                <button id="views">Views</button>
                <span className="show_count">{post.views}</span>
                </div>
                </div>
             })
           }
            
        
        </div>
    )
}

export default Post;