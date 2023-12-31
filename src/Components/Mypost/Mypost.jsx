import { useEffect, useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import Newpost from "./Newpost";
import axios from "axios";

const Mypost=(props)=>{

    const navigate=useNavigate();
    const [create,setCreate]=useState(false);
    const [mypost,setMypost]=useState([]);
    const [temp,setTemp]=useState([1]);
    const [mydraft,setMydraft]=useState([]);


    useEffect(()=>{
        if(props.authorization=="")
        {
            navigate('/signin');
        }
        else{

          
            fetch('http://127.0.0.1:3003/my_posts',{ method: 'GET',
            headers: {
              'Authorization': localStorage.Authorization
            }
            }).then((response)=>{
        return response.json();
        }).then((data)=>{
           //console.log(data);
           
           if('error' in data)
           {
            navigate('/signout')
           }
           else
           {
            setMypost([...data.articles]);
           }

          
           console.log(mypost);
        })
        .catch((error)=>{
            console.log(error);
        })

        fetch("http://127.0.0.1:3003/my_drafts", {
            headers: {
              'Authorization':localStorage.Authorization
              }
            })
        .then(response => {
        return response.json()} )
        .then(data => {
        console.log(data);
        if('error' in data && data.error=="Sign up or login")
        {
         navigate('/signout')
        }
        setMydraft([...data]);
        })
        .catch(error => {
        console.error('Error:', error);
        });

       


        }
    },[create,temp])
   
   
    const Delete=(id)=>{
    //   console.log(id,localStorage.Authorization);

    fetch(`http://127.0.0.1:3003/delete/?id=${id}`,
    { method: 'DELETE',
    headers: {
       
      'Authorization': localStorage.Authorization
    }
    })
.then(response => {
return response.json()} )
.then(data => {
// console.log(data);
if('message' in data && data.message=="Sign up or log in")
{
    navigate('/signout');
}
let temp=mypost.filter((val)=> val.id!=id);
setMypost([...temp]);

})
.catch(error => {
    console.error('Error:', error);
});

    }

   
    const myDraft=()=>{
        let ele=document.getElementById("your_draft");
        if(ele.style.display=="block")
        {
            ele.style.display="none"
        }
        else 
        {
            ele.style.display="block"
        }
        

        fetch("http://127.0.0.1:3003/my_drafts", {
    headers: {
      'Authorization':localStorage.Authorization
      }
    })
.then(response => {
return response.json()} )
.then(data => {
console.log(data);
if('error' in data && data.error=="Sign up or login")
{
 navigate('/signout')
}
setMydraft([...data]);
})
.catch(error => {
console.error('Error:', error);
});
    }



    const Edit=(id)=>{

        let title=document.getElementById(id).children[0];
        let topic=document.getElementById(id).children[1].children[0];
        let text=document.getElementById(id).children[4];
        let btn=document.getElementById(id).children[8].children[0];
        let img=document.getElementById(id).children[3]
        document.getElementById(id).children[2].style.display="none";
        img.style.display="block";
        // console.log(title,text,topic,btn);
        
        if(btn.innerHTML=="Edit")
        {
            topic.contentEditable=true;
            title.contentEditable=true;
            text.contentEditable=true;
            text.style.border="2px solid black";
            topic.style.border="2px solid black";
            title.style.border="2px solid black";
           
            btn.innerHTML="Update";
        }
        else{
           
            const file = img.files[0];
            const formData = new FormData();
          formData.append('image', file);
          formData.append('title',title.innerHTML.replaceAll('&nbsp;',' '));
          formData.append('text',text.innerHTML.replaceAll('&nbsp;',' '));
          formData.append('topic',topic.innerHTML.replaceAll('&nbsp;',' '));
          formData.append('id',id);
       
          axios.patch('http://127.0.0.1:3003/update',formData,{
            headers:{
                'Authorization':localStorage.Authorization
            }
          }).then((res)=>{
            console.log(res);

            if('message' in res.data && res.data.message=="Sign up or log in")
            {
                navigate('/signout');
            }
            setTemp([...temp,1]);
          })
          .catch((err)=>{
            console.log(err);
          })


img.style.display="none";
            topic.contentEditable=false;
            title.contentEditable=false;
            text.contentEditable=false;
            text.style.border="white";
            topic.style.border="white";
            title.style.border="white";
            btn.innerHTML="Edit";
            document.getElementById(id).children[2].style.display="block";
        }

    }

const deletedraft=(id)=>{

    fetch(`http://127.0.0.1:3003/draft_delete/?id=${id}`, {
        method:"DELETE",
        headers: {
          'Authorization':localStorage.Authorization
          }
        })
    .then(response => {
    return response.json()} )
    .then(data => {
    console.log(data);
    if('message' in data && data.message=="Sign up or log in")
    {
        navigate('signout');
    }
     let temp=mydraft.filter((val)=>{
        return val.id!=id;
    })
    setMydraft([...temp]);
     
    })
    .catch(error => {
    console.error('Error:', error);
    });

}

const postdraft=(id)=>{

    fetch(`http://127.0.0.1:3003/draft_post/?id=${id}`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          'Authorization':localStorage.Authorization
          }
        })
    .then(response => {
    return response.json()} )
    .then(data => {
    console.log(data);
    if('message' in data && data.message=="Sign up or log in")
    {
        navigate('/signout');
    }
     setTemp([1]);
    })
    .catch(error => {
    console.error('Error:', error);
    });

    

}

const editdraft=(id)=>{

    let list=document.getElementById(`draft_${id}`);
    let btn=list.children[0].children[3];
    let title_ele=list.children[0].children[0].children[0];
    let topic_ele=list.children[0].children[1].children[0];
    let text_ele=list.children[0].children[2];
    console.log(title_ele,topic_ele,text_ele);

    if(btn.innerHTML=="Edit")
    {
        btn.innerHTML="Save";
        title_ele.contentEditable=true;
        topic_ele.contentEditable=true;
        text_ele.contentEditable=true;
        title_ele.style.border="2px solid black"
        topic_ele.style.border="2px solid black"
        text_ele.style.border="2px solid black"

    }
    else
    {
        btn.innerHTML="Edit";
        title_ele.contentEditable=false;
        topic_ele.contentEditable=false;
        text_ele.contentEditable=false;
        title_ele.style.border="none"
        topic_ele.style.border="none"
        text_ele.style.border="none"


        axios.patch('http://127.0.0.1:3003/draft_update',{
                id:id,
                title:title_ele.innerText.replaceAll('&nbsp',' '),
                topic:topic_ele.innerText.replaceAll('&nbsp',' '),
                text:text_ele.innerText.replaceAll('&nbsp',' ')
        },{
            headers:{
                Authorization:localStorage.Authorization
            }
        })
        .then(res=>{
            console.log(res);
            if('error' in res.data && res.data.error=="Sign up or log in")
            {
                navigate('/signout');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }


}

const Revision_history=(id)=>{
console.log(id);
}


    
    return(
        <div>
            <button onClick={()=>{setCreate(!create)}} className="create_new">Create New</button>
            <button onClick={()=>{myDraft()}} className="create_new">My Drafts</button>
            <button onClick={()=>{navigate('/mylibrary')}} className="create_new">My library</button>
            <button onClick={()=>{navigate('/sharedList')}} className="create_new">Shared library</button>
            <div id="lists">

            </div>
            {create?<Newpost setCreate={setCreate} mypost={mypost} setMypost={setMypost}  />:null}
            <div>
                <div  id="your_draft" style={{display:"none"}}>
                    <h1  style={{margin:"30px",textAlign:"center"}}>Your Drafts: {mydraft.length}</h1>
                    <ol>
                    {
                        mydraft.map((values,idx)=>{
                            return <li id={`draft_${values.id}`} key={idx}>
                                <div>
                                <h3>Title: <span>{values.title}</span></h3>
                                <h4 >Topic: <span >{values.topic.name}</span></h4>
                                <p>{values.text}</p>
                                <button onClick={()=>{editdraft(values.id)}}>Edit</button>
                                <button onClick={()=>{deletedraft(values.id)}}>Delete</button>
                                <button onClick={()=>{postdraft(values.id)}}>Post Online</button>
                                </div>
                                </li>
                        })
                    }
                    </ol>
                </div>

                <h1 style={{margin:"30px",textAlign:"center"}}>Your Posts </h1>
                <ol>
                    {
                       
                        mypost.map((values,idx)=>{
                            return <li id={values.id} className="list_post" key={idx}>
                                <h3>{values.title}</h3>
                                <h4 >Topic: <span >{values.topic.name}</span></h4>
                                <img src={values.image_url} height={300} width={400}></img>
                                <input style={{display:"none"}} type="file" accept="image/*" />
                                <p>{values.text}</p>
                                <p>Likes: {values.likes}</p>
                                <p>Comments: {values.comments}</p>
                                <p>Views: {values.views}</p>
                                <div>
                                    <button onClick={()=>{Edit(values.id)}}>Edit</button>
                                    <button onClick={()=>{Delete(values.id)}}>Delete</button>
                                    <button onClick={()=>{navigate(`/history/${values.id}`)}}>Revision history</button>
                                    
                                </div>
                            </li>
                        })

                    }
                </ol>
            </div>
        </div>
    )
}

export default Mypost;