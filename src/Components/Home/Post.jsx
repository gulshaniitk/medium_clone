import { useEffect, useState } from "react";
import './Post.css'
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Post=(props)=>{

    const [data,setData]=useState([]);
    const {id}=useParams();
    const [temp,setTemp]=useState([1]);
    const [lists,setLists]=useState([]);
    const [comment,setComment]=useState("");
    const [comments,setComments]=useState([]);
    const [user,setUser]=useState();
    const [following,setFollowing]=useState(false);
    const [liked,setLiked]=useState(false);
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
                       if('message' in res && res.message=="Sign up or log in")
                       {
                        navigate('/signout');
                       }
                       console.log(res.author);
                       if(res.message!=undefined )
                       {
                            navigate(`/pay/${id}`);
                       }
                       else
                       {
                           

                           axios.get('http://127.0.0.1:3003/profile',{
                            headers:{
                                Authorization:localStorage.Authorization
                            }
                        }).then((res1)=>{
                            console.log(res1);
                            if('error' in res1.data)
            {
                navigate('/signout')
            }
                            for(let i=0;i<res1.data.follows.length;i++)
                            {
                                if(res1.data.follows[i]==res.author)
                                {
                                    setFollowing(true);
                                }
                            }

                            for(let i=0;i<res.likes.length;i++)
                            {
                                if(res.likes[i]==res1.data.username)
                                {
                                    setLiked(true);
                                }
                            }
                            setData([res]);
                           setComments(res.comments);

                        })
                        .catch((err)=>{
                            console.log(err);
                        })

                       } 
                    })
                    .catch((error)=>{
                        
                        console.log(error);
                       
                    })

        fetch(`http://127.0.0.1:3003/my_lists`, {
            headers: {
              'Authorization':localStorage.Authorization
              }
            })
        .then(response => {
        return response.json()} )
        .then(response => {

            if('error' in response && response.error=="Sign up or login")
            {
                navigate('/signout');
            }

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

                    if('error' in res && res.error=="Sign up or log in")
                    {
                        navigate('/signout');
                    }
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

    setFollowing(!following);

    
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
    if('error' in response && response.error=="Sign up or login")
    {
        navigate('/signout');
    }
    document.getElementById(listid).style.background="#90EE90";

    
    })
    .catch(error => {
    console.error('Error:', error);
    });

}


const Comment_post=()=>{
  
    axios.post('http://127.0.0.1:3003/comment',{
        id:id,
        comment:comment
    },
    {
        headers:{
            Authorization:localStorage.Authorization
        }
    }).then((res)=>{
        console.log(res);
        if('message' in res.data && res.data.message=="Sign up or log in")
        {
            navigate('/signout');
        }
        setComments(res.data.comments);
    })
    .catch((err)=>{
        console.log(err);
    })
}


    return (
        <div>
           <button onClick={()=>navigate(-1)} className="back">Back</button>
           <button onClick={()=>{morePost()}} className="back">More Post By Similar Author</button>
           {
             data.map((post,idx)=>{
                return <div key={idx}>
                    <div className="post_byid">
                <h1 className="p_title">{post.title}</h1>
               <p className="p_author"><Link to={`/author/${post.author}`}>{post.author}</Link><button className="follow" id="follow" onClick={()=>{Follow()}}>{following?"Following":"Follow"}</button></p>
                <img src={post.image_url} width={680} height={380} ></img>
                <p className="p_text">{post.text}</p>
                <p className="topic">{post.topic}</p>
                </div>
                <div className="like_view">
                <button id="like" onClick={()=>{onLike()}} style={liked?{background:"red",color:"white"}:{background:"white",color:"black"}}  className="like">Like</button>
                <span className="show_count">{post.likes.length}</span>
                {/* <button id="comment">Comments</button>
                <span className="show_count">{post.comments.length}</span> */}
                <button id="views">Views</button>
                <span className="show_count">{post.views}</span>
                <h3>Comments :{comments.length}</h3>
                {
                    comments.map((val,idx)=>{
                        return <div key={idx}>
                            {val.user}: {val.comment}
                        </div>
                    })
                }
                </div>
                
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <textarea rows="4" cols="50" id="comment_val" placeholder="Comment here..." onChange={(e)=>{setComment(e.target.value)}} value={comment}></textarea>
                <button onClick={()=>{Comment_post()}}>Submit</button>
                </div>
                </div>
             })
           }
            <div style={{margin:"20px",display:"flex"}}>
                <h4 style={{margin:"5px"}}>Add to your library</h4>
                {
                lists.map((list,idx)=>{
                    return <button key={idx} onClick={()=>{addtolist(list.id)}} id={list.id}>{list.name}</button>
                })
            }
            </div>
        
        </div>
    )
}

export default Post;