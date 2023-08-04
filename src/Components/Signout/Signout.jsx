import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let x=0;
const Signout = (props) => {
  const navigate = useNavigate();


  useEffect(() => {

    if(localStorage.hasOwnProperty('Authorization'))
     fetch("http://127.0.0.1:3003/logout",{ method: 'DELETE',
    headers: {
      'Authorization': localStorage.Authorization
    }
    })
.then(response => {
return response.json()} )
.then(data => {
console.log(data);
localStorage.removeItem('Authorization');
navigate('/');
props.setAuthorization("");

})
.catch(error => {
    console.error('Error:', error);
});


    
  }

  
    ,[]);



    


};

export default Signout;