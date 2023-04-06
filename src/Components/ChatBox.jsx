import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileImage from "../img/profileImg.jpg"
import "./ChatBox.css"
import { format } from 'timeago.js';
import InputEmoji from "react-input-emoji"
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatBox = ({chat,currentuser,setSendmessage,receiveMessage}) => {

    const[userdata,sertuserData] = useState(null)
    const [messages,setMessages] = useState([])
    const[newMessage,setNewmessage] = useState("")
    const [number,setNumber] = useState()
    const scroll = useRef()

    const navigate = useNavigate()

    const {user} = useContext(AuthContext)


    useEffect(()=> {
        if(receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages,receiveMessage])
        }
    },[receiveMessage])


    useEffect(()=> {
        const userId = chat?.members?.find((id)=>id!==currentuser)
        console.log(userId)
        const getUserdata = async()=> {
            try {
                const {data} = await axios.get(`/user/${userId}`)
                console.log(data);
                sertuserData(data)
            } catch (err) {
                console.log(err);
            }
           
        }
        if(chat!=null) getUserdata()
    },[chat,currentuser])

    useEffect(()=> {
        const fetchMessages = async ()=> {
            try {
                const {data} = await axios.get(`/post/${chat._id}`)
                setMessages(data)
                console.log(data);
            } catch(err) {
                console.log(err);
            }
        }
        if(chat !=null) fetchMessages()
    },[chat])

    const handleChange = (newMessage)=> {
            setNewmessage(newMessage)
    }

    const handleSend = async (e)=> {
        e.preventDefault()
        const message = {
            senderid:currentuser,
            text:newMessage,
            chatId:chat._id
        }
        try {
            const {data} =await axios.post(`/post`,message)
            setMessages([...messages,data])
            setNewmessage("")
            console.log(data);
        } catch(err) {
            console.log(err);
        }
        const receiverId = chat.members.find((id)=>id !== currentuser)
        setSendmessage({...message,receiverId})
    }

    useEffect(()=> {
        scroll.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const handleGet = async()=> {

        const res = await axios.post(`/chat`,{senderid:user._id,receiverId:number})
        console.log(res);
        navigate("/")
      }
  return (
    <>
         <div className='ChatBox-container'>
         {chat ? (
            <>
            <div className='chat-header'>
                <div className='follower'>
                <div className='follower conversation'>
        <div>
            <img src={ProfileImage} alt=""
            className='followerImage'
            style={{width:"50px",height:"50px",borderRadius:"50%"}}
             />
             <div className='name' style={{fontSize:"0.8 rem"}}>
                <span className='username'>{userdata?.username}</span>
             </div>
            
        </div>
    </div>
    <div className='userInput'>
       <input className='textInput' placeholder='Enter user Id to create a Newchat Room' type="text" onChange={(e)=>setNumber(e.target.value)} />       
       <button className='btn' onClick={handleGet}>Create Chat</button>
    </div>
      <hr style={{width:"85%",border:"0.1px solid #ececec"}} />
                </div>
                <div  className='chat-body'>
                    {messages?.map((mes ,id )=> (
                        
                        <div key={id} ref={scroll} className={mes.senderid === currentuser ? "message own" : "message"}>
                       <span>{mes.text}</span> 
                       <span>{format(mes.createdAt)}</span>
                        </div>
                        
                        
                    ))}
                </div>
                <div className='chat-sender'>
                    <div>+</div>
                    <InputEmoji 
                        value={newMessage}
                        onChange={handleChange}
                        placeholder="Type a message"
                    />
                    <div onClick={handleSend} className='send-button button'>Send</div>
                </div>
            </div>
         </>
         ): (
            <span className='Empty-message'>Tap on a chat to start a Conversation</span>
         )}
        

        </div>
    </>
   
  )
}

export default ChatBox