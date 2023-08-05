import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";



const Author=(props)=>{

    const {username}=useParams();
    const navigate=useNavigate();
   const [info,setInfo]=useState([]);

    useEffect(()=>{
        console.log("token",localStorage.Authorization)
        if(!localStorage.hasOwnProperty('Authorization'))
        {
           
            navigate('/signin');
        }
        else
        {
            
            fetch(`http://127.0.0.1:3003/author/?username=${username}`,{ method: 'GET',
            headers: {
              'Authorization': localStorage.Authorization
            }
            }).then((response)=>{
        return response.json();
        }).then((data)=>{
          
            console.log(data);
            setInfo([data])
          
        })
        .catch((error)=>{
            console.log(error);
        })
        }
    },[])


 console.log(info)
    return (
        <div>
            <button onClick={()=>{navigate(-1)}}>Back</button>
           <h1>Author Information</h1>
           {
            info.map((val,idx)=>{
                return  <div>
                   <h3>Profile views: <p>{val.profile_views}</p></h3>
                   <h3>UserName: <p>{val.username}</p></h3>
                   <h3>Interests: <p>{val.interests}</p></h3>
                   <h3>Speciality: <p>{val.speciality}</p></h3>
                   <h3>Articles: <p>{val.articles.length}</p></h3>
               </div>
            })
           }
          
        </div>)
    
}

export default Author;