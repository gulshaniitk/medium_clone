import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile=({user})=>{

    const navigate=useNavigate();

    useEffect(()=>{
        if(user=="")
        {
            console.log("User is ",user);
            navigate('/signin');
        }
    },[])

    return (
        <div>
            <h2>Your Profile</h2>
            <div>
                <p>Name: </p>
                <p>Email: </p>
            </div>
            <div>
                <div>
                    <h3>Followers</h3>
                </div>
                <div>
                    <h3>Following</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile;