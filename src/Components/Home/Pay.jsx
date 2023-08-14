import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

const Pay=(props)=>{
  const navigate=useNavigate();
 const [val,setVal]=useState(100);
 const {id}=useParams();

 useEffect(()=>{
    if(props.authorization=="")
    {
       
        navigate('/signin');
    }        
 },[])

    const pay=()=>{

      

        fetch(`http://127.0.0.1:3003/pay`,
        { method:"POST",
         headers:{
            'Content-Type': 'application/json',
            'Authorization':localStorage.Authorization},
        body : JSON.stringify({
            amount:val
        })
        }).then((res)=>{
            return res.json();
            }).then((res)=>{
            console.log(res);

            if('message' in res && res['message']== "Sign up or log in")
            {
                navigate('/signout');
            }

            navigate(-1);
            })
            .catch((error)=>{
                console.log(error);
            })
        
        
    }

    return (
        <div style={{margin:"10px"}}>
            <button onClick={()=>navigate(-1)} style={{margin:"10px",padding:"5px"}}>Back</button>
        <h1 style={{margin:"10px 0px"}}>Pay the amount to view post</h1>
        <input placeholder="Enter Amount" id="amount" value={val} onChange={(e)=>{setVal(e.target.value)}}></input>
        <button onClick={()=>{pay();}}>Pay</button>
        <p style={{color:"red"}}>Your daily quota is over, upgrade plan or wait till tomorrow</p>
        </div>
    )
}

export default Pay;