import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pay=()=>{
  const navigate=useNavigate();
 const [val,setVal]=useState(0);

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
            navigate(-1);
            })
            .catch((error)=>{
                console.log(error);
            })
        
       
    }

    return (
        <div>
        <h1>Pay the amount to view post</h1>
        <input placeholder="Enter Amount" id="amount" value={val} onChange={(e)=>{setVal(e.target.value)}}></input>
        <button onClick={()=>{pay();}}>Pay</button>
        </div>
    )
}

export default Pay;