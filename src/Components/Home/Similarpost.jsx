import { useEffect, useState } from "react";
import './Post.css'
import { useParams,Link,Outlet,useNavigate } from "react-router-dom";

const Similarpost=(props)=>{
    const author = useParams().author.toLocaleLowerCase();
    const navigate=useNavigate();
    const [data,setData]=useState([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:3003/?page=1&books_per_page=100000').then((response)=>{
        return response.json();
        }).then((filterdata)=>{
            let temp1=filterdata.filter((data1)=>{
                return (data1.author.toLowerCase().includes(author));
            })
           
            setData(temp1);
            console.log(temp1);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    return(
        <div>
        <button onClick={()=>navigate(-1)} className="back">Back</button>
        {
          data.map((post,idx)=>{
            return <div className="post" key={idx}>
                <div className="left">
                <p className="author">{post.author}</p>
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
                <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
                <div className="lower">
                <p className="date">{post.created_at.substr(0,10)}</p>
                <p className="topic">{post.topic}</p>
                </div>
                </div>
                
                 <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
                
              </div>
          })
        }
        </div>
    )
}

export default Similarpost;