import { useEffect, useState } from "react";
import './Post.css'
import { useParams,useNavigate } from "react-router-dom";

const Post=(props)=>{

    const [data,setData]=useState([]);
    const {id}=useParams();
    const navigate=useNavigate();
    console.log(id);

    useEffect(()=>{
        fetch(`http://127.0.0.1:3003/?${id}`).then((response)=>{
        return response.json();
        }).then((res)=>{
          
            setData(res);
          
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

const onLike=()=>{
    const ele=document.getElementById('like');
   
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
               <p className="p_author">{post.author.name}<button className="follow" id="follow" onClick={()=>{Follow()}}>Follow</button></p>
                <img src={post.image_url} width={680} height={380} ></img>
                <p className="p_text">{post.text}</p>
                <p className="topic">{post.topic.name}</p>
                </div>
                <div className="like_view">
                <button id="like" onClick={()=>{onLike()}} className="like">Likes</button>
                <span className="show_count">{post.likes}</span>
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