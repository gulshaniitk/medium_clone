import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

const Mylibrary=()=>{


    const navigate=useNavigate();
    const [lists,setLists]=useState([]);
    const [show,setShow]=useState([]);

    const [data,setData]=useState([]);
    const [listno,setListno]=useState(0);
    const [articles,setArticles]=useState([]);
    const [temp,setTemp]=useState([1]);
    const [shared,setShared]=useState([]);

    useEffect(()=>{
       
        

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
            setShow([]);
        }

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
        console.log(data);
        showListData();
        })
        .catch(error => {
        console.error('Error:', error);
        });
    
    
    }


    const showNewList=(x)=>{
   
       
        console.log("listno ",x);
        
        setListno(x);
        console.log(listno);
       

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
        console.log("article deleted",response);
        showListData();
        
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
        <h1>Your Library</h1>
        <div>
            <button onClick={()=>{createList()}} className="create_new">Create New List</button>
            {
                lists.map((x)=>{
                    return <button onClick={()=>{showNewList(x.id)}} className="create_new">list {x.id}</button>
                })
            }
        </div>
         <div>
            <h1>List :{listno}</h1>
         {
          show.map((post,idx)=>{
            return <div className="post">
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
        <div>
            <input style={{marginLeft:10}} id="user_name" placeholder="Enter user name"></input>
            <button onClick={()=>{shareList()}}>Share</button>
            <div>
                <h3>Shared with :</h3>
                {
                    shared.map((ele)=>{
                        return <div style={{margin:10}}><span>{ele}</span><button onClick={()=>{Unsharelist(ele)}}>Unshare</button></div>
                    })
                }
            </div>
        </div>
         </div>
         <button onClick={()=>{deleteList()}} className="create_new">Delete</button>
        </div>
        
    )
}

export default Mylibrary;