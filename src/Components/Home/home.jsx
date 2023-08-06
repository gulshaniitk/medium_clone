import { Link,Outlet, json, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import './Home.css'


const Home = (props) => {
  const navigate=useNavigate();
  const [data,setData]=useState([]);
  const [show,setShow]=useState([]);
  const saved = [];
    useEffect(()=>{
        fetch('http://127.0.0.1:3003/?page=1&books_per_page=100000').then((response)=>{
        return response.json();
        }).then((data)=>{
          console.log(data);
            setData(data);
            setShow(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    const Recommend=()=>{
      if(props.authorization=="")
        {
            navigate('/signin');
        }
        else{

          
          fetch('http://127.0.0.1:3003/profile',{ method: 'GET',
          headers: {
            'Authorization': props.authorization
          }
          }).then((response)=>{
      return response.json();
      }).then((profileinfo)=>{
        
          console.log(profileinfo);
          const str1 = profileinfo.interest;
          let temp1=data.filter((val)=>{
            console.log(val);
            return (val.title.toLowerCase().includes(str1) || val.topic.toLowerCase().includes(str1) );
          })
          
          setShow([...temp1]);
      })
      .catch((error)=>{
          console.log(error);
      })
        }
        
    }
    const Topiclist=()=>{
      navigate('/Topiclist');
    }
    const Search=()=>{
      let temp2=data;
      const str=document.getElementById("search").value.toLowerCase();
      
      if(str=="")
      {
        setShow(data);
        return ;
      }

      let temp=temp2.filter((val)=>{
        console.log(val);
        return (val.text.toLowerCase().includes(str)|| val.title.toLowerCase().includes(str) || val.author.toLowerCase().includes(str) || val.topic.toLowerCase().includes(str) );
      })
     
      setShow([...temp]);

      }
  
      const Likes=()=>{
        let temp2=data;
        temp2.sort((a,b)=>{
          return b.likes.length-a.likes.lngth;
        })
        setShow([...temp2]);
      }

      const Views=()=>{
        let temp2=data;
        temp2.sort((a,b)=>{
          return (b.views-a.views);
        })
        setShow([...temp2]);
      }

  const Filter=()=>{
  let str=document.getElementById("date").value;
  if(str=="")
  {
    setShow([...data]);
    return ;
  }
  str=new Date(str);
  let temp=data.filter((val)=>{
    let x=new Date(val.created_at);
    return x>=str;
  })
 
  setShow([...temp]);

  }
  const Savedpost=()=>{
    setShow([...saved]);
  }
  const Saved=(post)=>{
    saved.push(post);
  }

  return (
    <div>
      
      <div className="search_bar">
        <input type="text" id="search" placeholder="Search..." />
        <button onClick={()=>{Search()}} id="search_btn">Search</button>
      </div>
      <div className="filter_bar" >
        <div>
        <label>Sort by</label>
        <button onClick={()=>{Likes()}}>Likes</button>
        <button onClick={()=>{Views()}}>Views</button>
        </div>
        <div>
        <button onClick={()=>{Views()}}>Top Posts</button>
        <button onClick={()=>{Recommend()}}>Recommended Posts</button>
        <button onClick={()=>{Topiclist()}}>Topics List</button>
        <button onClick={()=>{Savedpost()}}>Saved Post</button>
        </div>
        
        <div>
        <label>Filter by</label>
        <input type="date" id="date" onChange={()=>{Filter()}}/>
        </div>
        
      </div>
     
      
      <div>
        
        {
          show.map((post,idx)=>{
            return <div className="post">
                <div className="left">
                <p className="author">{post.author}</p>
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
                <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
                <div className="lower">
                <p className="date">{post.created_at.substr(0,10)}</p>
                <p className="topic">{post.topic}</p>
                <p>Reading Time: {post.reading_time_minute} minutes</p>
                <button onClick={()=>{Saved(post)}}>Save for later</button>
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