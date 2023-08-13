
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const SharedList=(props)=>{

    const [lists,setLists]=useState([]);
    const [data,setData]=useState([]);
    const [name,setName]=useState("");
    const [show,setShow]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
       
        if(props.authorization=="")
        {
           
            navigate('/signin');
        }
        else
        {

            axios.get('http://127.0.0.1:3003/?page=1&books_per_page=100000').then((res)=>{
                console.log(res);
                // setData(res.data);

                axios.get('http://127.0.0.1:3003/view_shared',{
                    headers:{
                        Authorization:localStorage.Authorization
                    }
                   }).then((res1)=>{
                    console.log(res1);
                    setLists(res1.data['shared lists']);
                    const temp=res1.data['shared lists'];
                    let ans=[];
                    for(let i=0;i<temp.length;i++)
                    {
                        let arr=[]
                        for(let x of temp[i].articles_included)
                        {
                            for(let post of res.data)
                            {
                                if(x==post.id)
                                {
                                    arr.push(post)
                                }
                            }
                        }
                        ans.push(arr);
                    }
                    setData(ans);

                   })
                   .catch((err)=>{
                    console.log(err);
                   })

               })
               .catch((err)=>{
                console.log(err);
               })


      
    }
    
    },[])


    const changeList=(x,y)=>{

        setName(x);
        setShow(data[y]);
    }

    return (
        <div>
            <button style={{margin:"10px",padding:"3px"}} onClick={()=>navigate('/mypost')}>Back</button>
            <div>
            <h1 style={{textAlign:"center",margin:"25px"}}>Shared Library</h1>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {
                lists.map((x,idx)=>{
                    return <button onClick={()=>{changeList(x.name,idx)}} className="create_new" key={idx}>{x.name}</button>
                })
            }
           
        </div>
        <div>
               <h2 style={{textAlign:"center"}}>{name}</h2>
               {
          show.map((post,idx)=>{
            return <div className="post" key={idx}>
                <div className="left">
                <p className="author">{post.author}</p>
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
                <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
                <div className="lower">
                <p className="date">{post.created_at.substr(0,10)}</p>
                <p className="topic">{post.topic}</p>
                <p>Reading Time: {post.reading_time_minute} minutes</p>
                </div>
                </div>
                
                 <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
                
              </div>
          })
        }
            </div>
            </div>
        </div>
    )
}

export default SharedList;