import axios from "axios";
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

const Mylibrary=(props)=>{


    const navigate=useNavigate();
    const [lists,setLists]=useState([]);
    const [show,setShow]=useState([]);

    const [data,setData]=useState([]);
    const [listno,setListno]=useState(0);
    const [name,setName]=useState("");
    const [articles,setArticles]=useState([]);
    const [temp,setTemp]=useState([1]);
    const [shared,setShared]=useState([]);
    const [listName,setListName]=useState("");
    const [shareStatus,setShareStatus]=useState("");

    useEffect(()=>{
       
        if(props.authorization=="")
        {
           
            navigate('/signin');
        }
        else
        {

        fetch('http://127.0.0.1:3003/?page=1&books_per_page=100000').then((response)=>{
            return response.json();
            }).then((data)=>{
            //   console.log(data);
                setData(data);
                showListData();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
            
    
    },[listno])


    const showListData=()=>{
        fetch(`http://127.0.0.1:3003/my_lists`, {
            headers: {
              'Authorization':localStorage.Authorization
              }
            })
        .then(response => {
        return response.json()} )
        .then(response => {


            console.log(response,listno);
            setLists(response);
            if(response.length!=0)
            {

            
            let temp1={};
            
            for(let i=0;i<response.length;i++)
            {
                if(response[i].id==listno)
                {
                    temp1=response[i];
                    setShared(response[i].shared_with)
                    break;
                }
            }
            
            if(Object.keys(temp1).length==0)
            {
                setListno(response[0].id)
                setName(response[0].name)
                setShared(response[0].shared_with)
                temp1=response[0];
            }
            console.log(listno,temp1,data);
            let temp2=[];
            for(let i=0;i<data.length;i++)
            {
                for(let j=0;j<temp1.articles_included.length;j++)
                {
                    if(data[i].id==temp1.articles_included[j])
                    {
                        console.log(data[i]);
                        temp2.push(data[i]);
                    }
                }
            }
            console.log(temp1,temp2);
           setShow([...temp2]);
       
        }
        else
        {
            setListno(0);
            setName("");
            setShow([]);
        }

        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

  

    const createList=()=>{


        axios.post('http://127.0.0.1:3003/create_list',{
            name:listName
        },{
            headers:{
                Authorization:localStorage.Authorization
            }
        }) .then(data => {
            console.log(data);
            showListData();
            setListName("");
            })
            .catch(error => {
            console.error('Error:', error);
            });

    
        // fetch(`http://127.0.0.1:3003/create_list`, {
        //     method:"POST",
        //     headers: {
        //       'Authorization':localStorage.Authorization
        //       },
              
        //     })
        // .then(response => {
        // return response.json()} )
        // .then(data => {
        // console.log(data);
        // showListData();
        // })
        // .catch(error => {
        // console.error('Error:', error);
        // });
    
    
    }


    const showNewList=(x,y)=>{
   
       
        // console.log("listno ",x);
        
        setListno(x);
        setName(y);
        // console.log(listno);
       

    }

    const deleteList=()=>{
        fetch(`http://127.0.0.1:3003/delete_list`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
              'Authorization':localStorage.Authorization
              },
              body:JSON.stringify({
                list_id:listno
              })
            })
        .then(response => {
        return response.json()} )
        .then(response => {
         
         showListData();
        
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }


    const removeArticle=(postid)=>{
        fetch(`http://127.0.0.1:3003/remove_article`, {
            method:"Post",
            headers: {
              'Content-Type': 'application/json',
              'Authorization':localStorage.Authorization
              },
              body:JSON.stringify({
                list_id:listno,
                article_id:postid
              })
            })
        .then(response => {
        return response.json()} )
        .then(response => {
        console.log("article deleted",response);
        showListData();
        
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

    const shareList=()=>{
        let str=document.getElementById("user_name").value;
        fetch(`http://127.0.0.1:3003/share_list`, {
            method:"Post",
            headers: {
              'Content-Type': 'application/json',
              'Authorization':localStorage.Authorization
              },
              body:JSON.stringify({
                list_id:listno,
                uname:str
              })
            })
        .then(response => {
        return response.json()} )
        .then(response => {
        console.log(response);
        showListData();
        if('error' in response)
        {
            setShareStatus(response.error);
        }
        else
        {
            setShareStatus("Shared succesfully")
        }
        
        })
        .catch(error => {
        console.error('Error:', error);
        
        });


    }


    const Unsharelist=(str)=>{
    
        fetch(`http://127.0.0.1:3003/unshare_list`, {
            method:"Post",
            headers: {
              'Content-Type': 'application/json',
              'Authorization':localStorage.Authorization
              },
              body:JSON.stringify({
                list_id:listno,
                uname:str
              })
            })
        .then(response => {
        return response.json()} )
        .then(response => {
        console.log("article deleted",response);
        showListData();
        
        })
        .catch(error => {
        console.error('Error:', error);
        });



    }


    return (
        <div>
        <button onClick={()=>{navigate(-1)}} className="create_new">Back</button>
        <h1 style={{textAlign:"center",margin:"25px"}}>Your Library</h1>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>
            <input id="list_name" placeholder="Enter list name.." value={listName} onChange={(e)=>setListName(e.target.value)}></input>
            <button style={{margin:"0px 20px 0px 0px"}} onClick={()=>{createList()}} className="create_new">Create New List</button>
            </div>
            {
                lists.map((x)=>{
                    return <button onClick={()=>{showNewList(x.id,x.name)}} className="create_new">{x.name}</button>
                })
            }
        </div>
         <div>
            <h2 style={{textAlign:"center"}}>{name}</h2>
         {
          show.map((post,idx)=>{
            return <div className="post" key={idx}>
                <div className="left">
                <p className="author">{post.author}</p>
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
                <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
                <div className="lower">
                <p className="date">{post.created_at.substr(0,10)}</p>
                <p className="topic">{post.topic}</p>
                <p>Reading Time: {post.reading_time_minute} minutes</p>
                <button onClick={()=>{removeArticle(post.id)}}>Remove</button>
                </div>
                </div>
                
                 <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
                
              </div>
          })
        }
        <div style={{margin:"50px 20px 20px 100px"}}>
            <input style={{marginLeft:10}} id="user_name" placeholder="Enter user name" onChange={(e)=>{setShareStatus("")}}></input>
            <button onClick={()=>{shareList()}}>Share</button>
            <p style={{color:"red"}}>{shareStatus}</p>
            <div>
                <h3>Shared with :</h3>
                {
                    shared.map((ele,idx)=>{
                        return <div key={idx} style={{margin:10}}><span>{ele}</span><button onClick={()=>{Unsharelist(ele)}}>Unshare</button></div>
                    })
                }
            </div>
        </div>
         </div>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <button style={{padding:"10px",fontSize:"20px",color:"red"}} onClick={()=>{deleteList()}} className="create_new">Delete List</button>
         </div>
         
        </div>
        
    )
}

export default Mylibrary;