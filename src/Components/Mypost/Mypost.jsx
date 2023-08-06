import { useEffect, useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import Newpost from "./Newpost";

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
            
           setMypost([...data.articles]);
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
let temp=mypost.filter((val)=> val.id!=id);
setMypost([...temp]);

})
.catch(error => {
    console.error('Error:', error);
});

    }

   
    const myDraft=()=>{

        document.getElementById("your_draft").style.display="block";

        fetch("http://127.0.0.1:3003/my_drafts", {
    headers: {
      'Authorization':localStorage.Authorization
      }
    })
.then(response => {
return response.json()} )
.then(data => {
console.log(data);
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
        let btn=document.getElementById(id).children[9].children[0];
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
          formData.append('title',title.innerHTML);
          formData.append('text',text.innerHTML);
          formData.append('topic',topic.innerHTML);
          formData.append('id',id);
          
//             fetch(`http://127.0.0.1:3003/update`, 
//         { method: "POST",
//         headers: {
//             // 'Accept': 'application/json',
//             // 'Content-Type': 'application/json' ,
//             Authorization: localStorage.Authorization
//           },
        
//         body: formData
//         })
// .then(response => {
// return response.json()} )
// .then(data => {
// console.log("record updated",data);
// // setTemp([...temp]);
// })
// .catch(error => {
// console.error('Error:', error);
// });

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
     setTemp([1]);
    })
    .catch(error => {
    console.error('Error:', error);
    });

    

}

const createList=()=>{
    
    fetch(`http://127.0.0.1:3003/create_list`, {
        method:"POST",
        headers: {
          'Authorization':localStorage.Authorization
          }
        })
    .then(response => {
    return response.json()} )
    .then(data => {
    console.log("list id",data);
    })
    .catch(error => {
    console.error('Error:', error);
    });

    showList();

}

const showList=()=>{
    let lists=[];
    fetch(`http://127.0.0.1:3003/my_lists`, {
        headers: {
          'Authorization':localStorage.Authorization
          }
        })
    .then(response => {
    return response.json()} )
    .then(data => {
    console.log("list id",data);

    let text=``;


    for(let i=0;i<data.length;i++)
    {
        text+=`<button>${data[i].id}</button>`
    }

    document.getElementById("lists").innerHTML=text;
    
    })
    .catch(error => {
    console.error('Error:', error);
    });

    


}
    
    return(
        <div>
            <button onClick={()=>{setCreate(!create)}} className="create_new">Create New</button>
            <button onClick={()=>{myDraft()}} className="create_new">My Drafts</button>
            <button onClick={()=>{createList()}} className="create_new">Create List</button>
            <button onClick={()=>{showList()}} className="create_new">Show Lists</button>
            <div id="lists">

            </div>
            {create?<Newpost setCreate={setCreate} mypost={mypost} setMypost={setMypost}  />:null}
            <div>
                <div>
                    <h3  style={{margin:"30px"}} id="your_draft" style={{display:"none"}}>Your Drafts: {mydraft.length}</h3>
                    <ol>
                    {
                        mydraft.map((values)=>{
                            return <li><div>
                                <h3>Title: {values.title}</h3>
                                <h4 >Topic: <span >{values.topic.name}</span></h4>
                                <p>{values.text}</p>
                                <button onClick={()=>{deletedraft(values.id)}}>Delete</button>
                                <button onClick={()=>{postdraft(values.id)}}>Post Online</button>
                                </div></li>
                        })
                    }
                    </ol>
                </div>

                <h2 style={{margin:"30px"}}>Your Posts</h2>
                <ol>
                    {
                       
                        mypost.map((values,idx)=>{
                            return <li id={values.id} className="list_post">
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