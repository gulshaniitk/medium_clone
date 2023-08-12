import { useEffect, useState } from "react";
import './Post.css'
import { useParams,useNavigate, Link } from "react-router-dom";

const Post=(props)=>{

    const [data,setData]=useState([]);
    const {id}=useParams();
    const [temp,setTemp]=useState([1]);
    const [lists,setLists]=useState([]);
    const navigate=useNavigate();
    

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
                       console.log(res.author);
                       if(res.message!=undefined )
                       {
                            navigate('/pay');
                       }
                       else
                       {
                       setData([res]);
                       } 
                    })
                    .catch((error)=>{
                        
                        console.log(error);
                        if(error=="Sign up or login")
                        {
                            navigate('/signin');
                        }
                    })

        fetch(`http://127.0.0.1:3003/my_lists`, {
            headers: {
              'Authorization':localStorage.Authorization
              }
            })
        .then(response => {
        return response.json()} )
        .then(response => {
        setLists([...response]);

        
        })
        .catch(error => {
        console.error('Error:', error);
        });

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

const morePost=()=>{
    navigate(`/Similarpost/${data[0].author}`);
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
                       
                    setTemp([...temp])
                      
                    })
                    .catch((error)=>{
                        navigate('/signin');
                        console.log(error);
                    })
       
            ele.innerHTML="Following"
    }
    else
    {
        ele.innerHTML="Follow"
    }
}

const addtolist=(listid)=>{
 
    

    fetch(`http://127.0.0.1:3003/insert_article`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':localStorage.Authorization
          },
          body:JSON.stringify({
            list_id:listid,
            article_id:id
          })
        })
    .then(response => {
    return response.json()} )
    .then(response => {
    console.log(response);
    document.getElementById(listid).style.background="#90EE90";

    
    })
    .catch(error => {
    console.error('Error:', error);
    });

}


    return (
        <div>
           <button onClick={()=>navigate(-1)} className="back">Back</button>
           <button onClick={()=>{morePost()}} className="back">More Post By Similar Author</button>
           {
             data.map((post,idx)=>{
                return <div key={idx}><div className="post_byid">
                <h1 className="p_title">{post.title}</h1>
               <p className="p_author"><Link to={`/author/${post.author}`}>{post.author}</Link><button className="follow" id="follow" onClick={()=>{Follow()}}>Follow</button></p>
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
            <div>
                <h4>Add to your library</h4>
                {
                lists.map((list,idx)=>{
                    return <button key={idx} onClick={()=>{addtolist(list.id)}} id={list.id}>list {list.id}</button>
                })
            }
            </div>
        
        </div>
    )
}

export default Post;