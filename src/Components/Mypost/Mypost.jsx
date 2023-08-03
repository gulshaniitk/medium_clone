import { useEffect, useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import Newpost from "./Newpost";

const Mypost=({user})=>{

    const navigate=useNavigate();

    useEffect(()=>{
        if(user=="")
        {
            console.log("User is ",user);
            navigate('/signin');
        }
    },[])
   

    const [create,setCreate]=useState(false);
    const [mypost,setMypost]=useState([{title:"I Am Not Your Nigga",
    url:"https://miro.medium.com/v2/resize:fit:828/format:webp/1*o5GD5GOYZhaMCDcghI0jMA.jpeg",content:`It has been almost a decade since my grandmother on my mom’s side died. She and I were very close, but there was a time I did not see or talk to her for several months because she hurt my feelings so badly and made me feel very embarrassed.

    My mom is Black, and my dad is white. I have only known my mom and her side of my family ever since I was born. My brother has a different father than me. His father was Puerto Rican. My mom never kept in touch with either of our fathers. My mom raised both of us by herself.
    
    She has never had a serious relationship since my father left her almost 50 years ago.`,time:new Date().toISOString().slice(0,10),topic:"culture",

likes:0,comments:[],views:0}]);

    console.log(mypost);

    return(
        <div>
            <button onClick={()=>{setCreate(!create)}} >Create New</button>
            {create?<Newpost setCreate={setCreate} mypost={mypost} setMypost={setMypost} />:null}
            <div>
                <h2>Your Posts</h2>
                <ol>
                    {
                       
                        mypost.map((values,idx)=>{
                            return <li>
                                <h3>{values.title}</h3>
                                <h4>Topic: {values.topic}</h4>
                                <img src={values.url} height={200} width={200}></img>
                                <p>{values.content}</p>
                                <p>Created on: {values.time}</p>
                                <p>Likes: {values.likes}</p>
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