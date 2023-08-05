import { useEffect, useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import Newpost from "./Newpost";

const Mypost=(props)=>{

    const navigate=useNavigate();
    const [create,setCreate]=useState(false);
    const [mypost,setMypost]=useState([]);
    const [temp,setTemp]=useState([1]);


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
          console.log(data);
            const urls = [];
            
            for(let i=0;i<data.articles.length;i++)
            {
                let id=data.articles[i].id;
                urls.push(`http://127.0.0.1:3003/details/?id=${id}`);
            }
            console.log(urls);

            Promise.all(urls.map(url => fetch(url,{ 
                headers: {'Authorization':localStorage.Authorization
                }})))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      
        console.log(data);
        setMypost([...data]);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

        })
        .catch((error)=>{
            console.log(error);
        })
        }
    },[create,temp])
   

    const Delete=(id)=>{
      console.log(id,localStorage.Authorization);

    fetch(`http://127.0.0.1:3003/delete/?id=${id}`,
    { method: 'DELETE',
    headers: {
       
      'Authorization': localStorage.Authorization
    }
    })
.then(response => {
return response.json()} )
.then(data => {
console.log(data);
let temp=mypost.filter((val)=> val.id!=id);
setMypost([...temp]);

})
.catch(error => {
    console.error('Error:', error);
});

    }

   

    const Edit=(id)=>{

        let title=document.getElementById(id).children[0];
        let topic=document.getElementById(id).children[1].children[0];
        let text=document.getElementById(id).children[4];
        let btn=document.getElementById(id).children[9].children[0];
        let img=document.getElementById(id).children[3]
        document.getElementById(id).children[2].style.display="none";
        img.style.display="block";
        console.log(title,text,topic,btn);
        
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
          formData.append('title',title.innerHTML);
          formData.append('text',text.innerHTML);
          formData.append('topic',topic.innerHTML);
          formData.append('id',id);
          
            fetch(`http://127.0.0.1:3003/update`, 
        { method: "POST",
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json' ,
            'Authorization': localStorage.Authorization
          },
        
        body: formData
        })
.then(response => {
return response.json()} )
.then(data => {
console.log(data);
setTemp([...temp]);
})
.catch(error => {
console.error('Error:', error);
});
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

    
    return(
        <div>
            <button onClick={()=>{setCreate(!create)}} className="create_new">Create New</button>
            {create?<Newpost setCreate={setCreate} mypost={mypost} setMypost={setMypost}  />:null}
            <div>
                <h2>Your Posts</h2>
                <ol>
                    {
                       
                        mypost.map((values,idx)=>{
                            return <li id={values.id} className="list_post">
                                <h3>{values.title}</h3>
                                <h4 >Topic: <span >{values.topic}</span></h4>
                                <img src={values.image_url} height={300} width={400}></img>
                                <input style={{display:"none"}} type="file" accept="image/*" />
                                <p className="text_post">{values.text}</p>
                                <p>Created on: {values.created_at.substr(0,10)}</p>
                                <p>Likes: {values.likes.length}</p>
                                <p>Comments: {values.comments.length}</p>
                                <p>Views: {values.views}</p>
                                <div>
                                    <button onClick={()=>{Edit(values.id)}}>Edit</button>
                                    <button onClick={()=>{Delete(values.id)}}>Delete</button>
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