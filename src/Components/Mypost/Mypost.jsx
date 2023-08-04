import { useEffect, useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import Newpost from "./Newpost";

const Mypost=(props)=>{

    const navigate=useNavigate();
    const [create,setCreate]=useState(false);
    const [mypost,setMypost]=useState([]);


    useEffect(()=>{
        if(props.authorization=="")
        {
            navigate('/signin');
        }
        else{

          
            fetch('http://127.0.0.1:3003/my_posts',{ method: 'GET',
            headers: {
              'Authorization': props.authorization
            }
            }).then((response)=>{
        return response.json();
        }).then((data)=>{
          
            const urls = [];
            
            for(let i=0;i<data.articles.length;i++)
            {
                let id=data.articles[i].id;
                urls.push(`http://127.0.0.1:3003/details/?id=${id}`);
            }

            Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      
        console.log(data);
        setMypost([...data]);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

          
                // fetch(`http://127.0.0.1:3003/details/?id=${id}`).then((res)=>{
                //     return res.json();
                //     }).then((res)=>{
                //     //    console.log(res);
                //     temp.push(res);
                      
                //     })
                //     .catch((error)=>{
                //         console.log(error);
                //     })
            
            
            
        })
        .catch((error)=>{
            console.log(error);
        })
        }
    },[create])
   
    console.log(mypost);
    return(
        <div>
            <button onClick={()=>{setCreate(!create)}} className="create_new">Create New</button>
            {create?<Newpost setCreate={setCreate} mypost={mypost} setMypost={setMypost}  />:null}
            <div>
                <h2>Your Posts</h2>
                <ol>
                    {
                       
                        mypost.map((values,idx)=>{
                            return <li>
                                <h3>{values.title}</h3>
                                <h4>Topic: {values.topic.name}</h4>
                                <img src={values.image_url} height={200} width={200}></img>
                                <p>{values.text}</p>
                                <p>Created on: {values.created_at.substr(0,10)}</p>
                                <p>Likes: {values.likes.length}</p>
                                <p>Comments: {values.comments.length}</p>
                                <p>Views: {values.views}</p>
                            </li>
                        })

                    }
                </ol>
            </div>
        </div>
    )
}

export default Mypost;