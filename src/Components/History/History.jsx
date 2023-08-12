import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";


const History=(props)=>{

    const navigate=useNavigate();
    const {id}=useParams();
    const [history,setHistory]=useState([]);

    useEffect(()=>{

        if(props.authorization=="")
        {
            navigate('/signin');
        }
        else{
        console.log(id,localStorage.Authorization);

        axios.get(`http://127.0.0.1:3003/history/?id=${id}`,{
            headers:{
                Authorization:props.authorization
            }
        }).then((res)=>{
            console.log(res);
            setHistory(res.data.history);
        }).catch((err)=>{
            console.log(err);
        })

       

    }

    },[])

    return (
        <div>
            <button style={{margin:"10px",padding:"5px"}} onClick={()=>{navigate(-1)}}>Back</button>
            <h1 style={{textAlign:"center"}}>Revision History</h1>
            <div>
                <ol>
                {
                    history.map((post,idx)=>{
                        return <li>
                            <div>
                            <h3>Title: <span>{post.title}</span></h3>
                            <h3>Topic: <span >{post.topic}</span></h3>
                            <p>{post.text}</p>
                            </div>
                        </li>
                    })
                }
                </ol>
            </div>
        </div>
    )

}

export default History;