import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileImage from "../img/profileImg.jpg"

const Conversation = ({data,currentuser , online}) => {


    const [userdata,setUserdata] = useState(null)

    useEffect(()=> {

        const userId = data.members.find((id)=>id!==currentuser)
        console.log(userId)
        const getUserdata = async()=> {
            try {
                const {data} = await axios.get(`/user/${userId}`)
                console.log(data);
                setUserdata(data)
            } catch (err) {
                console.log(err);
            }
           

        }
        getUserdata()
    },[currentuser,data])
  return (
    <>
    <div className='follower conversation'>
        <div>
            <div className='online-dot'>{online ? <div className='online-status'></div> : <div className='offline-status'></div>}</div>
            <img src={ProfileImage} alt=""
            className='followerImage'
            style={{width:"50px",height:"50px",borderRadius:"50%"}}
             />
             <div className='name' style={{fontSize:"0.8 rem"}}>
                <span className='username'>{userdata?.username}</span>
                <span>{online ? "Online" : "Offline"}</span>
             </div>
        </div>
    </div>
    <hr style={{width:"85%",border:"0.1px solid #ececec"}} />
    </>
  )
}

export default Conversation