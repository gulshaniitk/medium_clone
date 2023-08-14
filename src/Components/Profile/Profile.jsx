import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile=(props)=>{
 

    const navigate=useNavigate();

    const [user,setUser]=useState([]);

    useEffect(()=>{
        if(props.authorization=="")
        {
           
            navigate('/signin');
        }
        else
        {
            
            fetch('http://127.0.0.1:3003/profile',{ method: 'GET',
            headers: {
              'Authorization': props.authorization
            }
            }).then((response)=>{
        return response.json();
        }).then((data)=>{
          
            console.log(data);

            if('error' in data)
            {
                navigate('/signout')
            }
            else
            {
                setUser([data]);
            }

           
        })
        .catch((error)=>{
            console.log(error);

        })
        }
    },[])


    const saveChanges=(x1,x2,x3)=>{


        axios.patch('http://127.0.0.1:3003/profile_edit',{
            name:x1,
            speciality:x3,
            interest:x2
        },{
            headers:{
                Authorization:localStorage.Authorization
            }
        }).then((data)=>{
            if('error' in data)
            {
                navigate('/signout')
            }
           
    console.log("Saving the changes",data);
})
.catch((error)=>{
    console.log(error);
})
    }



    const Edit=()=>{

  const btn=document.getElementById("p_edit");
  let name=document.getElementById("p_name").children[0];
  let interest=document.getElementById("p_interest").children[0];
  let speciality=document.getElementById("p_speciality").children[0];

  if(btn.innerHTML=="Edit")
  {
    btn.innerHTML="Save";
    name.contentEditable=true;
    name.style.border="2px solid black";
    interest.style.border="2px solid black";
    speciality.style.border="2px solid black";
    interest.contentEditable=true;
    speciality.contentEditable=true;
  }
  else
  {
    name.contentEditable=false;
    name.style.border="white";
    interest.style.border="white";
    speciality.style.border="white";
    interest.contentEditable=false;
    speciality.contentEditable=false;

    let x1=name.innerHTML.replaceAll('&nbsp;',' ');
    let x3=interest.innerHTML.replaceAll('&nbsp;',' ');;
    let x4=speciality.innerHTML.replaceAll('&nbsp;',' ');;
    
    saveChanges(x1,x3,x4);

    


    btn.innerHTML="Edit";
  }

    }

    return (
        <div style={{margin:"20px"}}>
            <h2 style={{margin:"10px",textAlign:"center"}}>Your Profile</h2>
            {
                user.map((values,idx)=>{
                    return <div key={idx} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <p id="p_name">Full Name: <span>{values.name}</span></p>
                                
                                <p id="p_interest">Interest: <span>{values.interest}</span></p>
                                <p id="p_speciality">Speciality: <span>{values.speciality}</span></p>
                                <button onClick={()=>{Edit()}} id="p_edit">Edit</button>
                                
                                <br /><br /><br />
                                <p id="p_username">UserName: <span>{values.username}</span></p>
                                <p>Account created on: {values.created_at.substr(0,10)}</p>
                                <p>Articles: {values.articles.length}</p>
                                <h3>Follows: {values.follows.length}</h3>
                                <div>
                                    {
                                        values.follows.map((x,idx)=>{
                                            return <p key={idx}>{x}</p>
                                        })
                                    }
                                </div>
                        </div>
                })
            }
        </div>
    )
}

export default Profile;