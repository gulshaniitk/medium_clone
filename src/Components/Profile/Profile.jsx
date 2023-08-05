import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
           setUser([data]);
        })
        .catch((error)=>{
            console.log(error);
        })
        }
    },[])


    const saveChanges=(x1,x2,x3,x4)=>{
        console.log(x1,x2,x3,x4);
        fetch('http://127.0.0.1:3003/profile_edit',{ method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      'Authorization': props.authorization
    },
    body:JSON.stringify({
        name:x1,
        username:x2,
        speciality:x4,
        interest:x3
    })
    }).then((response)=>{
return response.json();
}).then((data)=>{
  
    console.log("Saving the changes",data);
})
.catch((error)=>{
    console.log(error);
})
    }



    const Edit=()=>{

  const btn=document.getElementById("p_edit");
  let name=document.getElementById("p_name").children[0];
  let username=document.getElementById("p_username").children[0];
  let interest=document.getElementById("p_interest").children[0];
  let speciality=document.getElementById("p_speciality").children[0];

  if(btn.innerHTML=="Edit")
  {
    btn.innerHTML="Save";
    name.contentEditable=true;
    name.style.border="2px solid black";
    username.style.border="2px solid black";
    interest.style.border="2px solid black";
    speciality.style.border="2px solid black";
    username.contentEditable=true;
    interest.contentEditable=true;
    speciality.contentEditable=true;
  }
  else
  {
    name.contentEditable=false;
    name.style.border="white";
    username.style.border="white";
    interest.style.border="white";
    speciality.style.border="white";
    username.contentEditable=false;
    interest.contentEditable=false;
    speciality.contentEditable=false;

    let x1=name.innerHTML;
    let x2=username.innerHTML;
    let x3=interest.innerHTML;
    let x4=speciality.innerHTML;

    saveChanges(x1,x2,x3,x4);

    


    btn.innerHTML="Edit";
  }

    }

    return (
        <div>
            <h2>Your Profile</h2>
            {
                user.map((values,idx)=>{
                    return <div>
                                <p id="p_name">Full Name: <p>{values.name}</p></p>
                                <p id="p_username">UserName: <p>{values.username}</p></p>
                                <p id="p_interest">Interest: <p>{values.interest}</p></p>
                                <p id="p_speciality">Speciality: <p>{values.speciality}</p></p>
                                <button onClick={()=>{Edit()}} id="p_edit">Edit</button>
                                
                                <br /><br /><br />
                                <p>Account created on: {values.created_at.substr(0,10)}</p>
                                <p>Artiles: {values.articles.length}</p>
                                <h2>Follows: {values.follows.length}</h2>
                                <div>
                                    {
                                        values.follows.map((x)=>{
                                            return <p>{x}</p>
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