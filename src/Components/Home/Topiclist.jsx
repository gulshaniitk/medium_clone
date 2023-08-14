import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,Link,Outlet,useNavigate } from "react-router-dom";

const Topiclist=()=>{
    const navigate=useNavigate();
    const [topicsSet, setTopicsSet] = useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:3003/topics').then((data)=>{
            console.log(data.data);
            setTopicsSet([...data.data]);
        })
        .catch((error)=>{
            console.log(error);
        })

    },[])
    
    return(
        <div>
            <button style={{margin:"10px",padding:"5px"}} onClick={()=>navigate(-1)}>Back</button>
            <h1>All Topic List</h1>
            <br></br>
            <div>
            <ol>
               {topicsSet.map((val,idx)=>{
                if(val.name=="") return null;
                return <li key={idx}>{val.name}</li>
               })}
            </ol>
            </div>
        </div>
    )
}

export default Topiclist;