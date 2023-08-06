import { useEffect, useState } from "react";
import { useParams,Link,Outlet,useNavigate } from "react-router-dom";

const Topiclist=()=>{
    const navigate=useNavigate();
    const [topicsSet, setTopicsSet] = useState(new Set());
    useEffect(()=>{
        fetch('http://127.0.0.1:3003/?page=1&books_per_page=100000').then((response)=>{
        return response.json();
        }).then((filterdata)=>{
            console.log(filterdata);
            const topicsArray = filterdata.map((obj) => obj.topic);
            setTopicsSet(new Set(topicsArray));
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    
    return(
        <div>
            <h1>All Topic List</h1>
            <br></br>
            <div>
            <ul>
                {Array.from(topicsSet).map((element, index) => (
                <li key={index}>{element}</li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Topiclist;